import { useState } from 'react';
import "./WidgetSettings.scss"
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DraggableChildrenFn } from "react-beautiful-dnd"
import burger from '../../assets/burger.png'
import { JsxEmit } from 'typescript';


const WidgetSettings = () => {


    const [cities, setCities] = useState([
        {id: 0, name: "Samara"},
        {id: 1, name: "Moscow"},
        {id: 2, name: "Peter"},
        {id: 3, name: "Sochi"}
    ])

    interface cityI {
        id: number,
        name: string
    }

    const onDragEnd = (res:any) => {
        console.log("res", res);

    }

    const dragItems = (cities:cityI[]) => (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {
                    (provided: { droppableProps: any; innerRef: any; }, _snapshot: any) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {
                                cities.map((city:cityI, index) => (
                                    <Draggable key={city.id.toString()} draggableId={city.id.toString()} index={index}>
                                        {
                                            (provided: { innerRef: any; draggableProps: any; dragHandleProps: any; }, _snapshot: any) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {
                                                        <div key={city.id.toString()}>
                                                            {city.name}
                                                            <img src={burger} alt="burger" />
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        }
                                    </Draggable>
                                ))
                            }
                        </div>
                    )
                }
            </Droppable>
        </DragDropContext>

    )

    return (
        <>
            <div className="widget__settings">
                <div className="widget__settings-header">
                    <div>Settings</div>
                    <button className="widget__settings-close">
                    <img src="../assets/close.png" alt="close settings" />
                    </button>
                </div>

                <div className="widget__settings-city-list">
                    {dragItems(cities)}
                </div>

                <div className="widget__settings-add-city">
                    <label htmlFor="add">
                    Add city
                    <input
                        name="add"
                        type="text" />
                    </label>
                    <button className="widget__settings-add-btn">
                        <img src="../assets/enter.png" alt="add city" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default WidgetSettings