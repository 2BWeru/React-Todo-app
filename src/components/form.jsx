// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    activity:'',
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addActivity = (e) => {
    e.preventDefault();

    if(editIndex !== null){
         // Update existing item
    const updatedData = [ ...submittedData];
    updatedData[editIndex] = { ...formData};
    setSubmittedData(updatedData);
    setEditIndex(null)
    }else{
        setSubmittedData([ ...submittedData,{ ...formData}]);
    }
    setFormData({activity:'',});
  };

  const editActivity = (index) => {
    const itemToEdit = submittedData[index];
    setFormData({ ...itemToEdit});
    setEditIndex(index)
  }

  const deleteActivity = (index) =>{
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
    if (editIndex === index) {
      setFormData({ title: '', description: '' });
      setEditIndex(null);
    }
  };




  return (
    <div className="w-full max-w-[1246px] flex flex-col justify-center mx-auto rounded-sm m-10 shadow-xl border-gray-600 m-10 space-y-4 bg-[0b010ef5] px-4 ">
      <div className="flex flex-col mx-auto py-6">
        <p className="text-2xl border-b mb-10 font-bold text-gray-200 py-6 mx-auto text-center lg:text-start">
          What's the Plan For Today !!!
        </p>
        <form className="flex flex-row" onSubmit={addActivity}>
          <input
            className="bg-cyan-900 text-white rounded-md text-center mx-auto w-[400px] lg:mx-0 "
            type="text"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            placeholder="Add Event"
          />
          <button
            type="submit"
            className="bg-cyan-400 w-[80px] rounded-full m-4 text-center py-2"
          >
           {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </form>
      </div>

      <div className="flex flex-col justify-center">
        {submittedData.length > 0 && (
          <div>
          {submittedData.map((data,index)=>(
            <div key={index} className="flex flex-row border mb-10 space-x-4 border-gray-800 rounded-md px-6 py-6">
                <p className="text-white font-semibold w-3/4">
                {data.activity}
                </p>
                <div className="space-x-8 ">
                <button onClick={() => deleteActivity(index)} className="text-white bg-cyan-600 w-10 rounded-sm">
                    X
                </button>
                <button onClick={()=> editActivity(index)}  className="text-white w-10 bg-cyan-600 rounded-sm">
                    !
                </button>
                </div>
          </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
