import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { UiActions } from '../store/ui-slice'

const AddCandidateModal = () => {
 const[fullName,setFullName]=useState("")
 const[motto,setMotto]=useState("")
 const[image,setImage]=useState("")

const dispatch=useDispatch()

 // close add candiadate modal
 const closeModal =()=>{
    dispatch(UiActions.closeAddCandidateModal())
 }

  return (
    <section className="modal">
        <div className="modal_content">
            <header className="modal_header">
                <h4>Add Candidate</h4>
                <button className="modal_close" onClick={closeModal}><IoMdClose/></button>
            </header>
            <form >
                <div>
                    <h6>Candidate Name :</h6>
                    <input type="text" value={fullName} name='fullName' onChange={e=> setFullName(e.target.value)} />
                </div>
                <div>
                    <h6>Candidate Motto :</h6>
                    <input type="text" value={motto} name='Motto' onChange={e=> setMotto(e.target.value)} />
                </div>
                <div>
                    <h6>Candidate Image:</h6>
                    <input type="file"  name='Image' onChange={e=> setImage(e.target.files[0])} accept='png,jpg, jpeg,webp,avif' />
                </div>
                <button className='btn primary'>Add Candidate</button>
            </form>
        </div>
    </section>
  )
}

export default AddCandidateModal
