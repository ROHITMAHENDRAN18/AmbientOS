import axios from "axios";
import {useState} from "react";

import Toast from "./Toast";

function DeleteModal({

    device,

    closeModal,

    refreshDevices
    

})

 {

    async function deleteDevice() {

        try {

            await axios.delete(

                `http://127.0.0.1:8000/devices/${device.id}`

            );

            refreshDevices();

            closeModal();

           setToast(true);

setTimeout(()=>{

setToast(false);

},3000);

        }

        catch(err){

            console.log(err);

        }

    }
    const [toast,setToast]=useState(false);

    return(
        

        <div className="modal-overlay">

            <div className="delete-modal">

                <h2>
                    🗑 Delete Device
                </h2>

                <p>

                    Are you sure you want to delete

                    <br/><br/>

                    <b>{device.device_name}</b>

                </p>

                <div className="delete-buttons">

                    <button

                        className="delete-btn"

                        onClick={deleteDevice}

                    >

                        Delete

                    </button>

                    <button

                        className="cancel-btn"

                        onClick={closeModal}

                    >

                        Cancel

                    </button>

                </div>

            </div>
         {

toast &&

<Toast

message="✅ Device Deleted Successfully"

/>

}
        </div>

    );

}

export default DeleteModal;