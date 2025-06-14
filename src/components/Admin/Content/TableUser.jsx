function TableUser(props) {

    let { listUser, clickEditButton, ClickViewButton, ClickDeleteButton } = props
    return (

        < div className='table-user-container' >
            <div className='row'>
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser && listUser.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td >{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className='btn btn-secondary'
                                            onClick={() => { ClickViewButton(user) }}
                                        >
                                            View
                                        </button>
                                        <button
                                            className='btn btn-warning mx-3'
                                            onClick={() => { clickEditButton(user) }}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className='btn btn-danger'
                                            onClick={() => { ClickDeleteButton(user) }}
                                        >Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}

                        {listUser && listUser.length == 0 &&
                            <tr>
                                <td colSpan={'5'} className="text-center">Not Found Data</td>
                            </tr>
                        }

                    </tbody>
                </table>
            </div>
        </ div >
    )
}

export default TableUser