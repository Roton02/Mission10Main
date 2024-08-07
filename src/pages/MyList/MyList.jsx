import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../ContextProvider/ContextProvider";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyList = () => {
  const { user } = useContext(AuthContext);
  const [userspot, setUserSpot] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/addTousristSpot/${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserSpot(data);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/addTousristSpot/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            const remaining = userspot.filter((cof) => cof._id !== id);
            setUserSpot(remaining);
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto md:w-4/5 mx-auto mt-4">
      <Helmet>
        <title>My List</title>
      </Helmet>
      <div className="bg-green-100  border border-black">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-200 text-white">
            <tr className="text-black ">
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3">Tourist</th>
              <th className="px-6 py-3">Season</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">Update</th>
              <th className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y  divide-gray-200">
            {userspot.map((spot, index) => (
              <tr key={spot._id} className="text-center">
                <td className="px-6 py-4 whitespace-nowrap text-black">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-black">{spot.Tourist}</td>
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  {spot.seasonality}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  {spot.countryName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-black">
                  <Link to={`/updateTourist/${spot._id}`}>
                    <button className="btn bg-pink-600 text-white p-2 px-4 rounded-md hover:bg-pink-700">
                      <FaRegEdit />
                    </button>
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(spot._id)}
                    className="btn bg-red-600 text-white p-2 px-4 rounded-md hover:bg-red-700"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyList;
