import React, { useState } from "react";
import Swal from "sweetalert2";
import "./CRUD.css";

function CRUD() {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [data, setdata] = useState([]);
  const [editindex, seteditindex] = useState(null);

  const handleSave = async () => {
    if (!name.trim() || !age.trim()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Both name and age are required!",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Confirm Save",
      text: "Are you sure you want to save this data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, save it!",
    });

    if (result.isConfirmed) {
      setdata([...data, { name, age }]);
      setname("");
      setage("");
      Swal.fire("Saved!", "Your data has been saved.", "success");
    }
  };

  const handleEdit = async (index) => {
    const currentData = data[index];

    const { value: formValues } = await Swal.fire({
      title: "Edit Data",
      background: "#ebd6bb",
      html: `
        <input id="swal-input1" class="swal2-input" placeholder="Name" value="${currentData.name}">
        <input id="swal-input2" class="swal2-input" placeholder="Age" value="${currentData.age}" type="number">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const updatedName = document.getElementById("swal-input1").value;
        const updatedAge = document.getElementById("swal-input2").value;

        if (!updatedName.trim() || !updatedAge.trim()) {
          Swal.showValidationMessage("Both name and age are required!");
        } else {
          return { name: updatedName, age: updatedAge };
        }
      },
    });

    if (formValues) {
      const updatedData = [...data];
      updatedData[index] = formValues;
      setdata(updatedData);
      Swal.fire("Updated!", "The data has been updated.", "success");
    }
  };

  const deleteitem = async (index) => {
    const result = await Swal.fire({
      title: "Confirm Delete",
      text: "Are you sure you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#cf0b0b",
      cancelButtonColor: "#7c5f39",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const updatedData = data.filter((_, i) => i !== index);
      setdata(updatedData);
      Swal.fire("Deleted!", "The item has been deleted.", "success");
    }
  };

  return (
    <div className="boxstyle">
      <div>
        <div className="name">Name</div>
        <input value={name} placeholder="Enter Your Name" onChange={(e) => setname(e.target.value)} />
        <br />
        <br />

        <div className="age">Age</div>
        <input value={age} placeholder="Enter Your Age" type="number" onChange={(e) => setage(e.target.value)} />
        <br />
        <br />
        <button className="save" onClick={handleSave}>Save</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>
                <button className="delete" onClick={() => deleteitem(index)}>Delete</button>
                <button className= "edit" onClick={() => handleEdit(index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CRUD;