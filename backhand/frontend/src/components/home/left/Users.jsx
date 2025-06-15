import User from './User'
import useGetAllUsers from '../../../context/userGetAllUsers'

const Users = () => {
  const [allUsers, loading] = useGetAllUsers();

  return (
    <div className="h-full overflow-y-auto no-scrollbar ">
      {allUsers.map((user, index) => (
        <User key={index} user={user} />
      ))}
    </div>
  )
}

export default Users;
