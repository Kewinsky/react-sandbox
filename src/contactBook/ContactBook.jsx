import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LIMIT = 10;
const API_URL = `https://randomuser.me/api/?results=${LIMIT}`;

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  phone: z.string().min(9, "Phone must be at least 9 digits"),
  email: z.string().email("Invalid email address"),
});

const ContactBook = () => {
  const [users, setUsers] = useState([]);
  const [userToUpdate, setUserToUpdate] = useState(null);

  const prepareRandomData = (data) => {
    return data.map((user) => ({
      id: user.login.uuid,
      name: user.name.first,
      city: user.location.city,
      phone: user.phone,
      email: user.email,
      isExpanded: false,
      isEditable: false,
    }));
  };

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      setUsers(prepareRandomData(result.results));
    } catch (error) {
      console.error("Error: ", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (!users.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex mt-5">
      <AddUserComponent
        users={users}
        setUsers={setUsers}
        userToUpdate={userToUpdate}
        setUserToUpdate={setUserToUpdate}
      />
      <div className="ml-4">
        {users.length &&
          users.map((user, i) => (
            <UserTile
              key={i}
              user={user}
              setUsers={setUsers}
              userToUpdate={userToUpdate}
              setUserToUpdate={setUserToUpdate}
            />
          ))}
      </div>
    </div>
  );
};

const LoadingSpinner = () => {
  return (
    <div role="status" className="mt-2">
      <svg
        aria-hidden="true"
        className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const AddUserComponent = ({
  users,
  setUsers,
  userToUpdate,
  setUserToUpdate,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const handleAddUser = (data) => {
    setUsers([data, ...users]);
    reset();
  };

  const handleUpdateUser = (data) => {
    const updatedUser = { ...data, id: userToUpdate.id };

    setUsers((prevUsers) =>
      prevUsers.map((item) => (item.id === updatedUser.id ? updatedUser : item))
    );

    setUserToUpdate(null);
    reset();
  };

  useEffect(() => {
    if (userToUpdate) {
      reset({
        name: userToUpdate.name || "",
        city: userToUpdate.city || "",
        phone: userToUpdate.phone || "",
        email: userToUpdate.email || "",
      });
    } else {
      reset({ name: "", city: "", phone: "", email: "" }); // Clear form when editing is done
    }
  }, [userToUpdate, reset]);

  return (
    <form
      onSubmit={handleSubmit(userToUpdate ? handleUpdateUser : handleAddUser)}
    >
      {userToUpdate && (
        <p className="mb-2">You are editing: {userToUpdate.name}</p>
      )}
      <InputFieldWrapper>
        <div>
          <input type="text" placeholder="Name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
      </InputFieldWrapper>

      <InputFieldWrapper>
        <div>
          <input type="text" placeholder="City" {...register("city")} />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>
      </InputFieldWrapper>

      <InputFieldWrapper>
        <div>
          <input type="text" placeholder="Phone" {...register("phone")} />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </InputFieldWrapper>

      <InputFieldWrapper>
        <div>
          <input type="email" placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
      </InputFieldWrapper>

      <button
        type="submit"
        className={`px-2 py-1 ${
          userToUpdate ? "bg-yellow-400" : "bg-green-400"
        } rounded-lg text-black`}
      >
        {userToUpdate ? "Save" : "Add User"}
      </button>
    </form>
  );
};

const InputFieldWrapper = ({ children }) => {
  return <div className="mb-2">{children}</div>;
};

const UserTile = ({ user, setUsers, userToUpdate, setUserToUpdate }) => {
  // HINT: updating specific property of the object
  const handleOnExpand = (u) => {
    const updatedUser = { ...u, isExpanded: !u.isExpanded };

    setUsers((prevUsers) =>
      prevUsers.map((item) => (item.id === u.id ? updatedUser : item))
    );
  };

  const handleOnUpdate = (u) => {
    setUserToUpdate(u);
  };

  const handleOnDelete = (u) => {
    setUsers((prevUsers) => prevUsers.filter((item) => item.id !== u.id));
  };

  return (
    <div className="flex justify-between mb-5 p-2 border w-100 rounded-lg">
      <div className="flex flex-col justify-center">
        <h1 className="font-bold">{user.name}</h1>
        <p>{user.email}</p>

        {user.isExpanded && (
          <>
            <p>{user.city}</p>
            <p>{user.phone}</p>
          </>
        )}

        <button
          className="bg-transparent border-none  underline hover:no-underline w-fit"
          onClick={() => handleOnExpand(user)}
        >
          {user.isExpanded ? "Hide" : "Show more"}
        </button>
      </div>

      <div className="flex flex-col w-fit justify-center">
        <button
          className={`mb-2 px-2 py-1 ${
            userToUpdate ? "bg-gray-400" : "bg-yellow-400"
          } rounded-lg text-black`}
          disabled={userToUpdate}
          onClick={() => handleOnUpdate(user)}
        >
          Edit
        </button>
        <button
          className={`px-2 py-1 ${
            userToUpdate ? "bg-gray-400" : "bg-red-400"
          } rounded-lg text-black`}
          disabled={userToUpdate}
          onClick={() => handleOnDelete(user)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactBook;
