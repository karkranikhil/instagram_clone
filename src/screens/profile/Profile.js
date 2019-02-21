import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header';
import * as constants from '../../constants'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OWNER_INFO_DATA from '../../Mocks/owner_info'
import OWNER_RECENT_MEDIA from '../../Mocks/owner_recent_media'
import ImageGridList from '../../common/image-grid-list/index'
import ModalBox from '../../common/modal/index'
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';

class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            USER_DATA:null,
            USER_MEDIA:null,
            openModal:false,
            openDetailModal:false,
            selectedImage:null,
            comment:'',
            full_name:''
        }
    }
    componentDidMount() {
        
        // let data = null
        // let url = 'http://localhost:8080/owner-info'
        // var xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //      console.log(this.responseText)
        //     }
        //   }
        //   xhr.open("GET", url);
        //   xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        //   xhr.setRequestHeader('Cache-control', 'no-cache')
        //   xhr.send(data)
        //   xhr.onload = function() {
        //     if (xhr.status != 200) { // analyze HTTP status of the response
        //       // if it's not 200, consider it an error
        //       alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
        //     } else {
        //       // show the result
        //       console.log(xhr.responseText); // responseText is the server response
        //     }
        //   };
        
        // fetch('http://localhost:8080/owner-info').then(response => response.json())
        //   .then(data => {
        //     console.log(data)
        //   }).catch((err)=>console.log(err))
        this.setState({USER_DATA:OWNER_INFO_DATA.data, full_name:OWNER_INFO_DATA.data.full_name})
        this.setState({USER_MEDIA:OWNER_RECENT_MEDIA.data})
        
      }
      gridCallbackHandler=(data)=>{
        this.setState({openModal:true, selectedImage:data})
      }
      editFullName=()=>{
        this.setState({openDetailModal:true})
      }
      closeImageModalHandler=()=>{
        this.setState({openModal:false, openDetailModal:false})
      }
      addComment=(event)=>{
          event.preventDefault()
        let selectedImageWithComment = {...this.state.selectedImage,'comment':this.state.comment}
        this.setState({selectedImage:selectedImageWithComment, comment:'' })
      }
      updateFullName=(event)=>{
        event.preventDefault()
        let userdataWithUpdatedName = {...this.state.USER_DATA,'full_name':this.state.full_name}
        this.setState({USER_DATA:userdataWithUpdatedName})
        this.closeImageModalHandler()
    }
      handleInputChange=inputType => event => {
        this.setState({ [inputType]: event.target.value });
      };
    
    render() {
        const userData = this.state.USER_DATA
        const userMedia = this.state.USER_MEDIA
        const {openModal, selectedImage, openDetailModal} = this.state
        console.log(this.state.selectedImage)
        return (
            <div>
                <Header />
                {userData && <div className="container flex-container pd-top-5-per">
                    <img className="profile-pic flex-item" src={userData.profile_picture} alt="profile pic"/>
                    <div className="flex-container-column">
                     <h4 className="flex-item">{userData.username}</h4>
                     <div className="flex-container">
                        <p className="flex-1">Posts: {userData.counts.media}</p>
                        <p className="flex-1">Follows: {userData.counts.follows}</p>
                        <p className="flex-2">Followed By: {userData.counts.followed_by}</p>
                     </div>
                     <div className="flex-container">
                     <p className="flex-item">{userData.full_name}</p>
                     <Fab color="secondary" aria-label="Edit" className={'editBtn'} onClick={this.editFullName}>
                        <Icon>edit_icon</Icon>
                    </Fab>
                    <ModalBox openModal={openDetailModal} closeModal={this.closeImageModalHandler} widthClass={'userDetailModalClass'}>
                    <div className="flex-container-column justify-content-end">
                                <form className="flex-container">
                                        <h1>Edit</h1>
                                    <TextField
                                        id="fullName"
                                        label="Full Name *"
                                        placeholder="Full Name *"
                                        margin="normal"
                                        onChange={this.handleInputChange('full_name')}
                                        value={this.state.full_name}
                                        style={{width:"100%"}}
                                    />
                                    <Button type="submit" variant="contained"  className={'addBtn'} color="primary" onClick={this.updateFullName}>UPDATE</Button>
                                </form>
                            </div>
                    
                    </ModalBox>
                    </div>
                     </div>
                     
                     
                    
                </div>}
                {userMedia && <ImageGridList tileData={userMedia} gridCallback={this.gridCallbackHandler}/>}
                <ModalBox openModal={openModal} closeModal={this.closeImageModalHandler} widthClass={'imageModalClass'}>
                    {selectedImage && <div className="flex-container">
                        <div className="margin-right-2-per">
                            <img className="modalImage" src={selectedImage.images.standard_resolution.url} alt="selected pic"/>
                        </div>
                        <div className="flex-container-column">
                            <div className="flex-container">
                                <img className="modal-user-image" src={userData.profile_picture} alt="profile pic"/>
                                <h4 className="margin-10px">{userData.username}</h4>
                            </div>
                            <hr/>
                            {selectedImage.caption && selectedImage.caption.text && <p>{selectedImage.caption.text}</p>}
                            {selectedImage.tags && selectedImage.tags.length>0 && <p>{selectedImage.tags.map((item, index)=>{
                                return <a className="hashtag" href="void()" key={index}>{`#${item} `}</a>
                            })}</p>}

                            {userData.username && selectedImage.comment && <p><b>{userData.username}:</b> {selectedImage.comment}</p>}
                            <div className="flex-container-column justify-content-end">
                                <form className="flex-container">
                                    <TextField
                                        id="comment"
                                        label="Add a comment"
                                        placeholder="Add a comment"
                                        margin="normal"
                                        onChange={this.handleInputChange('comment')}
                                        value={this.state.comment}
                                        style={{flex:1}}
                                    />
                                    <Button type="submit" variant="contained"  className={'addBtn'} color="primary" onClick={this.addComment}>Add</Button>
                                </form>
                            </div>
                            
                        </div>
                     </div>}
                
                </ModalBox>
            </div>
        )
    }
}

export default Profile;
