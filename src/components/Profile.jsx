import React, { useEffect, useState } from 'react';
import { UserAuth } from './FilTubeAuthentications';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { STORAGE } from '../Firebase/config';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'; 
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Profile({showProfile, setShowProfile}) {

    const {user} = UserAuth();
    const [userData, setUserData] = useState({});
    const [newName, setNewName] = useState(userData.a_Name);
    const [newAge, setNewAge] = useState(userData.b_Age);
    const [gender, setGender] = useState("default");
    const [profile, setProfilePicture] = useState(null);
    const [editForm, setEditForm] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);


    useEffect(()=>{
        if(user?.email){
            const fetchUser = onSnapshot(doc(STORAGE,"FilmTube User",user?.email), (target) =>{
                if(target.exists()){
                  setUserData(target.data());
                  setNewName(target.data().a_Name);
                  setNewAge(target.data().b_Age);
                  setGender(target.data().c_Gender);
                }
            })
            return () => { fetchUser()}
        }
    },[user?.email])

    async function UpdateDetails(){
        setButtonLoading(true);
        if(!user){
            return
        }
        try {
            if (profile) {
                const storage = getStorage();
                const profilePictureRef = ref(storage, `profile_pictures/${user.email}`);
                await uploadBytes(profilePictureRef, profile); 
                const downloadURL = await getDownloadURL(profilePictureRef);
                await updateDoc(doc(STORAGE,"FilmTube User",user?.email), {
                    a_Name: newName,
                    b_Age: Number(newAge),
                    c_Gender: gender,
                    g_profile: downloadURL,
                });
            }
        setButtonLoading(false);
        setEditForm(!editForm);
        } catch (error) {
            console.error("Error Occurs!", error);
        }
    }

  return (
    <div className={` w-[425px] z-[500] bg-zinc-900 fixed top-0 max-w-full h-screen transition-all duration-300 ${showProfile ? `right-0` : `right-[-425px]`}  bg-zinc-950`}>
        <button className='px-3 py-1 rounded bg-red-600 text-white absolute top-5 right-5' onClick={()=>setShowProfile(!showProfile)}>x</button>
        <div className="flex items-center justify-center my-5 gap-2 cursor-pointer">
            <span className="text-white text-[25px] font-[600]">Film</span>
            <span className="bg-white text-red-500  w-fit h-[30px] leading-[30px] text-[25px] font-[600] py-0 px-1 rounded-lg"> Tube </span>
        </div>
        <div className=" flex gap-5 items-center justify-between w-[100%] mx-auto">
            <div className=" relative sm:w-[100%] w-[90%] mx-auto flex flex-col gap-3 items-center ">
                <div className="flex flex-col gap-5 justify-start items-center  w-[90%] mt-10">
                    <div className="w-[100px] h-[100px] rounded-full border border-gray-900" style={{backgroundImage:`url(${userData && userData.g_profile})`,backgroundPosition:"center", backgroundSize:"cover"}} ></div>
                    <div className="w-[100%] text-zinc-400 text-center font-[600] text-[25px]">{userData && userData.a_Name}</div>
                    <div className="grid grid-cols-3 w-[80%]">
                        <div className="w-[100%] text-center text-zinc-600"><span className='text-[20px] font-[600] text-white'>{userData && userData.b_Age}</span> <br /><span>Age</span></div>
                        <div className="w-[100%] text-center text-zinc-600"><span className='text-[20px] font-[600] text-white'>{userData && userData.c_Gender}</span> <br /><span>Gender</span></div>
                        <div className="w-[100%] text-center text-zinc-600"><span className='text-[20px] font-[600] text-white'>{userData && userData.f_Favorite === undefined ? "0" : userData.f_Favorite.length } </span><br /> <span>Favorites</span></div>
                    </div>
                    <div className="flex items-center justify-center w-[100%] mt-5">
                        <button onClick={()=> setEditForm(!editForm)} className='w-[70%] active:bg-red-800 bg-red-700 text-white py-2 rounded-md flex items-center justify-center gap-3'> Edit Profile <FaUserEdit/></button>
                    </div>
                </div>
            </div>
        </div>
        <div className={`${editForm ? "block" : "hidden"} absolute w-[100%] h-[100%] bg-zinc-900 top-0`}>
            <div className="flex items-center justify-end m-2">
                <button className='px-3 py-1 rounded bg-red-600 text-white' onClick={()=> setEditForm(!editForm)}>x</button>
            </div>
            <div className="flex flex-col justify-center gap-5 w-[300px] mx-auto">
                <div className="font-[600] txet-[25px] text-white text-center">Profile Edit</div>
                <input onChange={(e)=> setNewName(e.target.value)} value={newName} className='py-1 px-3 rounded-md bg-zinc-800 text-white' type="text" placeholder={userData.a_Name} />
                <input onChange={(e)=> setNewAge(e.target.value)} value={newAge} className='py-1 px-3 rounded-md bg-zinc-800 text-white' type="number" placeholder={userData.b_Age} />
                <select onChange={(e) => setGender(e.target.value)} name="" id="" className='px-3 py-1 rounded-md bg-zinc-800 text-white'>
                    <option value="default">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input type="file" accept="image/*" className='text-white bg-zinc-800'  onChange={e => setProfilePicture(e.target.files[0])} />
                {/* <input type="button" value={"Updates"} /> */}
                <div className='bg-red-600 text-white py-1 rounded text-center cursor-pointer' onClick={()=> UpdateDetails()}>
                    {buttonLoading ? (<div className=' flex items-center gap-3 justify-center w-full'> <AiOutlineLoading3Quarters  className='spinning'/> Updating...</div>):(<div className=' flex items-center gap-3 justify-center w-full'> Update</div>)}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile