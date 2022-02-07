import {
  IonInput,
  IonSelect,
  IonButton,
  IonLabel,
  IonIcon,
  IonItem,
  IonContent,
  IonToast,
  IonSelectOption,
  IonButtons,
  IonAlert
} from "@ionic/react";
import { 
  speedometerOutline,
  layersOutline,
  constructOutline,
  clipboardOutline, 
} from "ionicons/icons";
import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import "./PromoForm.css";
import * as api  from "../utils/api";
import axios from "axios";
import {promotion} from "../pages/Promo";
import {usePromo} from "../components/PromoFormEditing";

let renderCount = 0;
let initialValues = {
  rangeInfo: -100,
  cycle: "",
  year:"",
  specialityName: "",
  description:"",
 }; 
const PromoForm: React.FC = observer(() => {
  const {promot} = usePromo({
    id :0,
  description:"",
  cycle: "",
  year: "",
  specialityName: "",

  });
  const { control, handleSubmit, formState, reset, errors } = useForm({
    defaultValues: { ... initialValues },
    mode: "onChange"
  });
  renderCount++;
  const [showToast, setshowToast] = useState(false);
  const [SelectCycle, setCycle] = useState<string>();
  const [SelectYear, setYear] = useState<string>();
  const [promos,setpromos]=useState([]);
  const [showAlert,setshowAlert] =useState(false);  


    
  const getPromos = async () => {
    let res = await axios.get("/promo/promos");
    let data = res.data;
    setpromos(data);
  };
  useEffect(() => {
    getPromos();
  }, []);
 
 const showError = (_fieldName: string) => {
    let error = (errors as any)[_fieldName];
    return error ? (
      <div style={{ color: "red", fontWeight: "bold" }}>
        {error.message || "Field Is Required"}
      </div>
    ) : null;
  };
    const onSubmit = () => {
    let i;
    let value:promotion; 
    let include:boolean;
      include=false;
  getPromos();
    for (i=0;i<promos.length;i++){
       value=promos[i];
      if(promot.year.localeCompare(value.year)===0
      &&(promot.cycle.localeCompare(value.cycle)===0)
      && (promot.specialityName.localeCompare(value.specialityName)===0)
      ) 
          include=true;
          }
         
   if (include===false){
   api.addPromotion(promot.id,                
                   promot.description,
                   promot.cycle,
                   promot.year,
                   promot.specialityName,
                   );
                   
   setshowToast(true);
 }
 else setshowAlert(true);
 getPromos();
  };
       
   return (
    <IonContent color="dark">
       <IonToast
        isOpen={showToast}
        onDidDismiss={() => setshowToast(false)}
        message="Promo Added"
        duration={400}
      />
      <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setshowAlert(false)}
          message={'This Promotion Exists'}
          buttons={['OK']}
        />
      <form onSubmit={handleSubmit(()=>onSubmit())} style={{ padding: 20 , margin:30 , height:'auto'}}>
        <IonLabel color="light">
          <h1>Informations About Promotion </h1>
        </IonLabel>
        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={clipboardOutline}></IonIcon>
          <Controller
            as={IonInput}
            placeholder="Description"
            className="firstCapital"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("Description", selected.detail.value);
              promot.description=selected.detail.value;
             
              return selected.detail.value;
            }}
            name="description"
            rules={{
              required: true,              
            }}
          />
        </IonItem>
        {showError("description")}
        <IonItem color="dark">
          <IonLabel>Cycle</IonLabel>
          <IonIcon slot="start" icon={layersOutline}></IonIcon>
          <Controller
            as={
              <IonSelect
                value={SelectCycle}
                placeholder="Select One"
                onIonChange={e => setCycle(e.detail.value)}
              >
                <IonSelectOption value="CPI">
                  Preparatory
                </IonSelectOption>
                <IonSelectOption value="SC">Secondary</IonSelectOption>
              </IonSelect>
            }
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log(selected.detail.value);
              promot.cycle=selected.detail.value;
            
              return selected.detail.value;
            }}
            name="cycle"
            rules={{
              required: true
            }}
          />
          {showError("cycle")}
        </IonItem>

        <IonItem color="dark" class="">
          <IonIcon slot="start" icon={speedometerOutline}></IonIcon>
          <IonLabel>Year</IonLabel>
          <Controller
            as={ <IonSelect
              value={SelectYear}
              placeholder="Select One"
              onIonChange={e => setYear(e.detail.value)}
            > 
              <IonSelectOption value="1" > First 1 </IonSelectOption>
              <IonSelectOption value="2">Second 2</IonSelectOption>
              <IonSelectOption value="3">Third 3</IonSelectOption>
            </IonSelect>}
            placeholder="year"
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log("year", selected.detail.value);
              promot.year=selected.detail.value;
             
              return selected.detail.value;
            }}
            name="year"
            rules={{
              required: true,
            }}
          />
          {showError("year")}
        </IonItem>
        <IonItem color="dark">
          <IonIcon slot="start" icon={constructOutline}></IonIcon>
          <Controller
            as={IonInput}  
            placeholder="Speciality"         
            control={control}
            onChangeName="onIonChange"
            onChange={([selected]) => {
              console.log(selected.detail.value);
              promot.specialityName=selected.detail.value;
             
              return selected.detail.value;
            }}
            name="specialityName"
            rules={{
              required: false
            }}
          />
          {showError("specialityName")}
         
        </IonItem>
        <br/>
        <IonButtons class="ion-justify-content-center ion-padding ion-margin-top">
          <IonButton
            color="danger"
            fill="outline"
            type="button"
            onClick={() => {
              reset(initialValues);
            }}
          >
            Reset Form
          </IonButton>
          <IonButton
            color="light"
            type="submit"
            fill="outline"
            onClick={() => console.log(promot)}
            disabled={formState.isValid === false}
          >
            Submit
          </IonButton>
        </IonButtons>
      </form>
    </IonContent>
  );
});
export default PromoForm;
