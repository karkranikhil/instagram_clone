import React, { Component } from 'react';
import './Login.css';
import Header from '../../common/header/Header';
import Card from '../../common/Card/index';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import * as constants from '../../constants'
const resetField = {
    username:'',
    password:'',
    invalid:''
}
class Login extends Component {
    
    constructor(props){
        super(props)
       
        this.state={
            formData:{
                username:'',
                password:''
            },
            error:resetField
            
        }
    }
    componentDidMount(){
        let token = window.location.hash.split('=')[1]
        if(token){
            window.opener.authCallback(token)
        }
    }
    getAccessToken=()=>{
        let url = `${constants.URL_LIST.AUTH_URL}`
        let popup = window.open(url,'Login with Spotify', 'width=800,height=600')
        window.authCallback = (token) => {        
            popup.close()
            if (typeof(Storage) !== "undefined") {
                if (window.sessionStorage.AUTH_TOKEN) {
                    this.props.history.push('/home')
                } else {
                    window.sessionStorage.AUTH_TOKEN = token
                    this.props.history.push('/home')
                }
            }
        }
    }
    handleInputChange=inputType => event => {
        const { formData, error } = this.state;
        formData[inputType] = event.target.value;
        if(event.target.value){
            error[inputType] = ''
            error['invalid'] = ''
        }
        
        this.setState({formData, error});
      };
    
    submitForm =(event)=>{
        console.log(this.props)
        event.preventDefault()
        const { formData, error } = this.state;
        this.setState({error:resetField});
       if(formData.username === 'username' && formData.password === 'password'){
           
           this.getAccessToken()
       } else if(formData.username && formData.password && formData.username !== 'username' && formData.password !== 'password'){
            error['invalid'] = constants.ERROR_MESSAGES.INVALID_CREDENTIALS
        }   else {
                for (var errorKey in error) {
                    if(formData[errorKey] === ''){
                        error[errorKey] = constants.ERROR_MESSAGES.REQUIRED
                    }
                }
                this.setState({error});
            }
        }

    render() {
        const { formData, error } = this.state;
        return (
            <div>
                <Header />
                <div className="card-container">
                    <Card className="padding-Card">
                        <form noValidate='no'>
                        <div className="font-Size-24 margin-top-bottom-10px">LOGIN</div>
                        <FormControl className="field-flex">
                            <InputLabel htmlFor="component-username" className="font-Size-24">Username *</InputLabel>
                            <Input
                                id="component-username"
                                value={formData.username}
                                required
                                onChange={this.handleInputChange('username')}
                                placeholder="Username *"
                                autoComplete=""
                            />
                            {error.username && <FormHelperText className="error-color">{error.username}</FormHelperText>}
                        </FormControl>
                        <FormControl className="field-flex">
                            <InputLabel htmlFor="component-password" className="font-Size-24">Password *</InputLabel>
                            <Input
                                id="component-password"
                                value={formData.password}
                                type="password"
                                required
                                onChange={this.handleInputChange('password')}
                                placeholder="Password *"
                            />
                            {error.password && <FormHelperText className="error-color">{error.password}</FormHelperText> }
                        </FormControl>

                        {error.invalid && <FormHelperText className="error-color">{error.invalid}</FormHelperText>}

                        <Button type="submit" variant="contained"  color="primary" className="margin-top-5-per" onClick={this.submitForm}>LOGIN</Button>
                        </form>
                    
                    </Card>
                </div>
            </div>
        )
    }
}

export default Login;
