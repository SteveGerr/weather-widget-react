import { ReactNode, useState } from 'react';
import "./WidgetSettings.scss"
import { Draggable,
    DraggableLocation,
    DragDropContext,
    Droppable,
    DragUpdate,
    DropReason,
    DropResult
    } from 'react-beautiful-dnd';
// Images
import burger from '../../assets/burger.png'
import closeBtn from '../../assets/close.png'
import addCity from '../../assets/enter.png'
import trash from '../../assets/trash.png'



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

    const onDragEnd = (result:any) => {
        console.log("res", result);
        if (!result.destination) return

        const citiesArr = replaceCity(cities, result.source.index, result.destination.index)

        setCities(citiesArr)
    }

    const replaceCity = (cities:cityI[], startIndex:any, endIndex:any) => {
        const res = Array.from(cities);
        console.log("Array.from(cities)", res);

        const [removed] = res.splice(startIndex, 1);
        // console.log("removed", removed);
        res.splice(endIndex, 0, removed);

        return res;
    };

    const dragItems = (cities:cityI[]) => (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {
                    (provided: {
                        [x: string]: ReactNode; droppableProps: any; innerRef: any;
}, _snapshot: any) => (
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
                                                        <div className='widget__settings-city-item' key={city.id.toString()}>
                                                            <img src={burger} alt="burger" />
                                                            <span>{city.name}</span>
                                                            <button className='widget__settings-city-remove'>
                                                                <img src={trash} alt="remove" />
                                                            </button>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        }
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
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
                    <img src={closeBtn} alt="close settings" />
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
                        <img src={addCity} alt="add city" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default WidgetSettings