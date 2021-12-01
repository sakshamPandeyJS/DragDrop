import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';
import userdata from "./tempData.json";




function App() {
  const [users, setUsers] = useState(userdata.data);
  //console.log(users);

  const handleDragEnd = (results)=>{
    console.log("results",results.destination);
    if(!results.destination)return;
    const tempuser=[...users];
    let [selectedRow]=tempuser.splice(results.source.index,1);
    //console.log(selectedRow);
    tempuser.splice(results.destination.index,0,selectedRow);
    setUsers(tempuser);
  }
 return (
   <DragDropContext onDragEnd={(results)=>handleDragEnd(results)}>
    <div className="App mt-4">
        <table  className="table borderd">
          <thead className="head">
            <tr>
           <th scope="col">Drop</th>
           <th scope="col">Username</th>
           <th scope="col">Age</th>
           <th scope="col">Gender</th>
            </tr>
          </thead>
         
         <Droppable droppableId="tbody">
          
           {(provided)=>( 
             <tbody ref={provided.innerRef} {...provided.droppableProps} className="text-capitalize">
               {
                 users?.map((user, index) => (
                  <Draggable draggableId={user.name} index={index} key={user.name}> 
                     {
                       (provided)=>(
                         <tr ref={provided.innerRef}
                           {...provided.draggableProps}
                           >
                           <td {...provided.dragHandleProps}> = </td>
                           <td>{user.name}</td>
                           <td>{user.age}</td>
                           <td>{user.gender}</td>
                           
                         </tr>
                        
                       )
                     }
                   
                   </Draggable>

                 ))
               
             }  
               {provided.placeholder}
                </tbody>
 )}
             

          
         </Droppable>
              
           
       
        </table>
  
    </div>
    </DragDropContext>
  );
}

export default App;
