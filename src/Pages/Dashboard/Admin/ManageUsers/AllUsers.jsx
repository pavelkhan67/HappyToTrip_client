import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";


const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    const handleDelete = user => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete ${user.name} ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://happy-to-trip-server.vercel.app/users/admin/${user._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                `User ${user.name} is deleted!`,
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className="h-full w-11/12 mx-auto">
            <Helmet>
                <title>Happy To Trip | Manage Users</title>
            </Helmet>
            <div className="w-8/12 md:w-full ml-2 md:ml-0">
                <SectionTitle
                    heading="Manage Users"
                ></SectionTitle>
            </div>
            <div className="w-full mx-10 mb-5">
                <h3 className="text-xl uppercase font-semibold my-4">Total Users: {users.length}</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{
                                        user.role === 'admin' ? 'admin' : user.role === 'manager' ? 'manager' : user.role = 'user'
                                    }</td>
                                    <td>{
                                        user.role === 'admin' ? <button disabled='true' className="btn btn-ghost bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button> : <button onClick={() => handleDelete(user)} className="btn btn-ghost bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button>
                                    }</td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;