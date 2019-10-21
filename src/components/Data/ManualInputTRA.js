import React from "react";
import styled from "styled-components";
import { Form } from 'react-final-form';
import { Field } from 'react-final-form-html5-validation';



const StyledForm = styled(Form)`
  background: lightgreen;
`

const TRAInput = (props) => {

  // submit function (send data to state)
  const dataProcessSend = values => {

    const combinedDischarge = ((parseFloat(values.CRWS_Discharge) + parseFloat(values.ROCRWS_Discharge) + parseFloat(values.TMCRWS_Discharge))*(0.7));
    console.log("combined discharge")
    console.log(combinedDischarge)

    // send date through a prop function from data.js that will add it to some state var
    props.sendData(values)
  }

  // process data from props
  const data = props.data ? props.data.map((entry, i)=>(
    {
      discharge: entry.discharge,
      date: (entry.date.getMonth()+1)+`/`+(entry.date.toString().slice(8, 10))+`/`+(entry.date.getUTCFullYear().toString().slice(2)),
      time: entry.date.toTimeString().slice(0,5)
    }
  )) : null;
  // console.log("====== LOOKY HERE ======")
  // console.log(data)

  // make array of days in the dataset - used to tie the entered data to a certain day so we know where to render the data on the table
  const dayArray = [];
  const populateDayArray = data ? 
    data.map(entry => (
      dayArray.indexOf(entry.date) === -1 ? dayArray.push(entry.date) : null
    ))
  : null;
  // pop off first two days (first day is the current day so it's always incomplete)
  const newDayArray = dayArray.slice(0);
  // console.log("===== day array =====")
  // console.log(newDayArray)


  // {combinedDischarge ? 
  //   <div>
  //     <h1>TRA Wastewater combined discharge for </h1>
  //   </div>
    
  //   : null }

  return (
    <Form
      onSubmit={dataProcessSend}
      render={({ handleSubmit, form, submitting, pristine, values, invalid }) => (
        <form onSubmit={handleSubmit}>

          <div>

            <h6>NOTE: the form below is not yet functional - it will not update the table</h6>

            <label>Pick a Date</label>
            <Field 
              name="date" 
              component="select"
              required
              valueMissing="please select a date"
            >
              <option value="" disabled selected> Please select the date for your data</option>
              {/* make an <option /> for each date in data */}
              {newDayArray.map(entry =>
                <option value={entry}>{entry}</option>  
              )}

            </Field>
          </div>

          <div>
            <label>CRWS Discharge</label>
            <Field
              name="CRWS_Discharge"
              component="input"
              type="float"
              placeholder=""
              required
              valueMissing="please enter a value in all fields"
            />
          </div>

          <div>
            <label>ROCRWS Discharge</label>
            <Field
              name="ROCRWS_Discharge"
              component="input"
              type="float"
              placeholder=""
              required
              valueMissing="please enter a value in all fields"
            />
          </div>

          <div>
            <label>TMCRWS Discharge</label>
            <Field
              name="TMCRWS_Discharge"
              component="input"
              type="float"
              placeholder=""
              required
              valueMissing="please enter a value in all fields"
            />
          </div>
          
          <button type="submit" >
            Submit
          </button>
        </form>
      )}
    />
  )
}

export default TRAInput



//  <div>
  //        
    //      </div>
    //
      //    <div>
       //     <label for="CRWS_Discharge">CRWS Discharge:&nbsp;&nbsp;&nbsp;</label>
        //    <input type="text" name="CRWS_Discharge" />
         //   <label for="CRWS_Discharge">&nbsp;million gallons</label>
         // </div>
    
   //       <div>
    //        <label for="ROCRWS Discharge">ROCRWS Discharge:&nbsp;&nbsp;&nbsp;</label>
     //       <input type="text" name="ROCRWS Discharge" />
      //      <label for="ROCRWS Discharge">&nbsp;million gallons</label>
       //   </div>
    
  //        <div>
   //         <label for="TMCRWS Discharge">TMCRWS Discharge:&nbsp;&nbsp;&nbsp;</label>
    //        <input type="text" name="TMCRWS Discharge" />
     //       <label for="TMCRWS Discharge">&nbsp;million gallons</label>
      //    </div>
    
  //        <div>
   //         <button type="button" onclick={dataProcessSend()} >submit</button>
    //      </div>