import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { UiActions } from '../store/ui-slice'

function AddEleectionModal() {
    const [title,setitile]=useState("")
    const [description,setDescription]=useState("")
    const [thumbnail,setThumbnail]=useState("")
const dispatch=useDispatch()
// close election modallllll
const closeModal =()=>{
    dispatch(UiActions.closeElectionModal())
}

  return (
    <section className='modal'>
        <div className="modal_content">
            <header className="modal_header">
                <h4>Create new election</h4>
                <button className='modal_close' onClick={closeModal}><IoMdClose/></button>
            </header>
            <form>
                <div>
                    <h6>Election Title :</h6>
                    <input type="text" value={title} onChange={e=>setitile(e.target.value)} name='title' /> 
                </div>
                <div>
                    <h6>Election Description :</h6>
                    <input type="text" value={description} name='description' onChange={e=>setDescription(e.target.value)} />
                </div>
                <div>
                    <h6>Election Thumbnail :</h6>
                    <input type="file"onChange={ e=> setThumbnail(e.target.files[0])} name='thumbnail'  accept={"png,jpg,jpeg,webp,avif"}/>
                </div>
                <button type="submit"  className="btn primary"  >Add election</button>
            </form>
        </div>
    </section>
  )
}

export default AddEleectionModal
