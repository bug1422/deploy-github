import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import Modal from 'react-modal';
import { LoadingSpinner } from "../../../components/loading/LoadingSpinner"
import Avatar from "../../../assets/images/user.png"
import Cookies from 'universal-cookie'
import axios from "axios"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const UserProfile = () => {
    axios.defaults.baseURL = 'https://localhost:7115'
    const location = useLocation()
    const accountId = location.state
    const navigate = useNavigate()
    const cookies = new Cookies()
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [account, setAccount] = useState([])
    const [isDeactivating, SetIsDeactivating] = useState(false)
    const fetchData = async () => {
        await axios.get('/account/get-account-by-id', { params: { id: accountId } })
            .then((data) => {
                setAccount(data.data)
                setIsLoading(false)
            })
            .catch(e => console.log(e))
    }

    const reverseStatus = async () => {
        await axios.put('/account/toggle-account-status', { params: { id: accountId } })
            .then(window.location.reload)
            .catch(e => console.log(e))
    }

    useEffect(() => {
        let cookie = cookies.get('jwt_authorization')
        if (cookie !== undefined) {
            axios.defaults.headers.common['Authorization'] = 'bearer ' + cookie;
            fetchData()
        }
        else {
            navigate('/auth/login', { replace: true })
        }
    }, [])
    function confirmDeactive() {
        reverseStatus()
    }

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const popup = (
        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
    const profile = (
        <div className='p-5'>
            <button type="button" onClick={() => { navigate('/admin/user-management', { replace: true }) }} className="btn btn-light fw-medium text-uppercase mb-5">←Back</button>
            <div className="row g-3 px-5 h-100">
                <div className="col-md-6 flex-grow-1 overflow-auto">
                    <div className="col card h-100 bg-body-tertiary">
                        <div style={{ background: "#FEC401" }} className="card-body rounded text-uppercase card-main d-flex flex-column align-items-center">
                            <img className='profile-avt' src={Avatar} alt="" />
                            <h1 className='fs-medium text-center'>Username</h1>
                            <h5 className='text-center'>Role: {account.roleId}</h5>
                            <h5 className='text-center'>Account Id: {account.accountId}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 px-5 flex-grow-1 overflow-auto">
                    <h3 className='title text-center'>User Information</h3>
                    <p className=''>NAME : {account.fullname}</p>
                    <p className=''>ADRESS : {account.address}</p>
                    <p className=''>PHONE NUMBER : {account.phoneNo}</p>
                    <p className=''>GMAIL : {account.email}</p>
                    {isNaN(account.reportReporters) && <p className=''>REASON: Scam, toxic, flake, unreal prices</p>}
                    <p className=''></p>
                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" onClick={() => {
                        openModal()
                    }}>Deactivate</button>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Are You Sure?</h2>
                        {/* <h2>This account will be deactivate immediately, they will no longer be able to log in.</h2> */}
                        <button className="btn btn-success" onClick={() => {
                            confirmDeactive()
                            closeModal()
                        }}>
                            Yes
                        </button>
                        <button className="btn btn-danger" onClick={() => {
                            closeModal()
                        }}>
                            No
                        </button>
                    </Modal>
                </div>
            </div>
        </div>
    )
    return (
        <>
            {isLoading ? <LoadingSpinner /> : profile}
            {isDeactivating && popup}
        </>
    )
}
