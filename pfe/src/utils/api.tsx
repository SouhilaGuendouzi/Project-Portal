import axios from "axios";

const url = "http://localhost:3000";
const studentsUrl = "http://localhost:3000/student";
const teachersUrl = "http://localhost:3000/teacher";
const promotionUrl = "http://localhost:3000/promotion";
const teamUrl = "http://localhost:3000/teams";
const invitesUrl="http://localhost:3000/invites"; //all invites 
const inviteUrl="http://localhost:3000/invite"; //forinvitestudent
const invitedUrl="http://localhost:3000/invited";
const apiUrl = 'http://bragdonilyes.pythonanywhere.com/';
/**
 * this function return a promise so you can deal with response as you like
 */
export const addStudent = (
  id:number,
  fName: string,
  lName: string,
  dateOfBirth: Date,
  placeOfBirth: string,
  email: string,
  userName: string,
  password: string,
  promotion:number,
  isLeader:boolean,
  note:number

) => {
  // the  id will be generated automatically  by json-server
  const student = {
    id:id,
    firstName: fName,
    lastName: lName,
    dateOfBirth: dateOfBirth,
    placeOfBirth: placeOfBirth,
    email: email,
    userName: userName,
    password: password,
    promotion: promotion,
    isLeader:isLeader,
    note:note
   
  };

  return axios.post(studentsUrl, student);
};

export const modifyStudent = (
  id: number,
  fName: string,
  lName: string,
  dateOfBirth: Date,
  placeOfBirth: string,
  email: string,
  userName: string,
  password: string,
  promotion: number,
  isLeader:boolean,
  note:number,
) => {
  let student = {
    firstName: fName,
    lastName: lName,
    dateOfBirth: dateOfBirth,
    placeOfBirth: placeOfBirth,
    email: email,
    userName: userName,
    password: password,
    promotion: promotion,
    isLeader:isLeader,
    note:note
     };
  return axios.put(studentsUrl + "/" + id, student);
};

/* 
    notice that the parametere is optional 
    if no paramateres are provided it will fetch all students
    it works with reguler expresions ie : you need to provide the full name or just PART OF IT 
    ---------starts with first name, and use one blank as seperation-------------------- 
    the functions returns a promise so you can manage the response as you like
*/
export const getStudents = () => {
  let url = studentsUrl + "?";

  return axios.get(url);
};
export const getStudent=(id:number)=>{
  return axios.get(url+'students'+'/'+id);
};
export const deleteStudent = (id: number) => {
  return axios.delete(studentsUrl + "/" + id);
};


//same as addStudent
export const addTeacher = (
  fName: string,
  lName: string,
  dateOfBirth: Date,
  placeOfBirth: string,
  email: string,
  userName: string,
  password: string,
  grade: string,
  specialty: string
) => {
  //the id will be generated automatically
  const teacher = {
    firstName: fName,
    lastName: lName,
    dateOfBirth: dateOfBirth,
    placeOfBirth: placeOfBirth,
    email: email,
    userName: userName,
    password: password,
    grade: grade,
    specialty: specialty
  };

  return axios.post(teachersUrl, teacher);
};

export const modifyTeacher = (
  id: number,
  fName: string,
  lName: string,
  dateOfBirth: Date,
  placeOfBirth: string,
  email: string,
  userName: string,
  password: string,
  grade: string,
  specialty: string
) => {
  let teacher = {
    firstName: fName,
    lastName: lName,
    dateOfBirth: dateOfBirth,
    placeOfBirth: placeOfBirth,
    email: email,
    userName: userName,
    password: password,
    grade: grade,
    specialty: specialty
  };

  return axios.put(teachersUrl + "/" + id, teacher);
};

//same as getStudent
export const getTeachers = () => {
  let url = teachersUrl + "?";
   return axios.get(url);
 
};

export const deleteTeacher = (id: number) => {
  return axios.delete(teachersUrl + "/" + id);
};



export const addPromotion = (
  Id :number, 
  d:string,
  c: string,
  l: string,
  sC: string,
  
) => {
  const promotion = {
   
    id:Id, 
    cycle: c,
    year: l, 
    specialityName: sC,
    description:d,
  
  };

  return axios.post(url+'/promo/add/', promotion);
};
export const modifyPromotion = (
  Id: number,
  d:string,
  c: string,
  l: string,
 sC: string,
  minT:number,
  maxT:number,
  maxP:number
) => {
  const promotion = {
   description:d,
    cycle: c,
    year: l,
     specialityName: sC,
    minTeamMembers:minT,
    maxTeamMembers:maxT,
    maxProjects:maxP
  };
  modifyPromotionSetup(Id,minT,maxT,maxP);
  return axios.put(url+"/promo/modify/"+Id, promotion);
};
export const modifyPromotionSetup = (
  Id:number,
  minT:number,
  maxT:number,
  maxP:number
) => {
  const promotion = {
    minTeamMembers:minT,
    maxTeamMembers:maxT,
    maxProjects:maxP
  };
  return axios.put(url+'/promo/setup/'+ Id, promotion);
};
export const deletePromotion = (id: number) => {
  return axios.delete(url + "/promo/modify/" + id);
};
/**************************************************************/ 
export const getTeams = () => {
  return axios.get(url+'/users/teams');
};
export const getTeam=(id:number)=>{
  return axios.get(url+'/users/teams/'+id);
};
export const addTeam=(nm:string)=>{
 const team={
    name:nm
  }
  return axios.post(url+'/teams',team);
};
export const ValidateTeam=(idTeam:number)=>{
  return axios.post(url+'/users/validate/'+idTeam,true);
};
  export const getMembersTeam=(id :number)=>
  {
  return axios.get(url+'users/team/'+id);
  
};
/* export const deleteTeam=(id:number)=>{
  return axios.delete(url+'users/team/'+id);
};*/

/*****************************************************/
export const getStudentspromo=()=>{
  return axios.get(url+'/users/students');
  }
/********************************************* */
export const postInviteStudent=(id:number)=>{ //Id receiver

  return axios.post(url+'/users/student/invite/'+id);
}
export const getStudentInvited=(idStudent:number)=>{
    
  return axios.get(url+"/users/student/invite/"+idStudent);
}; 
export const getInvited=()=>
{
return axios.get(url+"/users/invited");
};
export const getInvite=(idInv:number)=>{

  return axios.get(url+'/users/invites/'+idInv);
}
export const modifyInvite=(idInv:number,idSender:number,idReceiver:number,accept:boolean,reject:boolean)=>{
  const invite={
    id:idInv,
    sender:idSender,
    receiver:idReceiver,
    accepted:accept,
    rejected:reject
  };
  
  return axios.put(url+'/users/invites/'+idInv,invite);

};
export const register = (
  email : string,
  password : string
) => {
  const newUser = {
    email : email,
    password : password
  }

  return axios({
    method : 'POST',
    url : url+'register',
    data : newUser
  })
}




export const addProject=(title:string,domain:string,tools:string,requiredDoc:string,document:FormData)=>
{
 const project={
    title:title,
    domain:domain,
    tools:tools,
    requiredDocuments:requiredDoc,
    document:document
  };
  return axios.post(url+'pfe/add/',project);
};
export const getProjects=()=>{
return axios.get(url+'pfe/projects');
};
export const getProject=(id:number)=>{
  return axios.get(url+'pfe/modify/'+id);
};
export const modifyProject=(id:number,
  title:string,
  domain:string,
  requiredDoc:string,
  document:string)=>{
    let project={
      title:title,
      domain:domain,
      requiredDocuments: requiredDoc,
      document:document
    }
  return axios.put(url+'pfe/modify/'+id,project);
}
export const deleteProject=(id:number)=>{
  return axios.delete(url+'pfe/modify/'+id);
}
export const AccRejProject=(id:number,status:string)=>
{
  return axios.put(url+'pfe/evaluate/'+id,status);
};
// this function (if successful) will return an accessToken property in reponse.data (expiration 1 hour)
export const login = (
  email : string,
  userName:string,
  password : string,

) => {
  const login = {
    email : email,
    password : password
  };

  //TODO : the url will be changed when integrating with the real backend
  return axios({
    method : 'POST',
    url : url+'login',
    data : login
  });
}