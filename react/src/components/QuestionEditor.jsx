import {useEffect, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {PlusIcon, TrashIcon} from "@heroicons/react/20/solid/index.js";
import {v4 as uuidv4} from 'uuid';

export default function QuestionEditor({
    index = 0,
    question,
    addQuestion,
    deleteQuestion,
    questionChange
    }) {

    const [model, setModel] = useState({...question});
    const { questionTypes } = useStateContext();

    useEffect(() => {
        questionChange(model);
    }, [model]);

    function upperCaseFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function shouldHaveOptions(type = null) {
        type = type || model.type;
        return ['select', 'radio', 'checkbox'].includes(type);
    }

    function onTypeChange(event) {
       const newModel = {
           ...model,
           type: event.target.value
       };

       if(!shouldHaveOptions(model.type) && shouldHaveOptions(event.target.value)) {
           if(!model.data.options) {
               newModel.data = {
                   options: [
                       {
                           uuid: uuidv4(),
                           text: ''
                       }
                   ]
               }
           }
       } else if(shouldHaveOptions(model.type) && !shouldHaveOptions(event.target.value)) {
            newModel.data = {};
       }
       setModel(newModel)
    }

    function addOption() {
        model.data.options.push(
            {
                uuid: uuidv4(),
                text: ''
            }
        )

        setModel({...model});
    }

    return (
        <div>
            <div className="flex justify-between mb-3">
                <h4>
                    {index + 1}. {model.question}
                </h4>
                <div className="flex items-center">
                    <button
                        type="button"
                        className="flex items-center text-xs py-1 px-3 mr-2 round-sm text-white bg-gray-600 hover:bg-gray-700"
                        onClick={() => addQuestion(index + 1)}
                    >
                        <PlusIcon className="w-4" />
                        add
                    </button>
                    <button
                        type="button"
                        className="flex items-center text-xs py-1 px-3 rounded-sm border border-transparent text-red-500
                        hover:border-red-600 font-semibold"
                        onClick={() => deleteQuestion(question)}
                    >
                        <TrashIcon className="w-4" />
                        Delete
                    </button>
                </div>
            </div>

            <div className="flex gap-3 justify-between mb-3">
                {/* question text*/}
                <div className="flex-1">
                    <label
                        htmlFor="question"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Question
                    </label>
                    <input
                        type="text"
                        name="question"
                        id="question"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
                        focus:ring-indigo-500 sm:text-sm"
                        onChange={(event) => setModel({...model, question: event.target.value})}
                    />
                </div>

                {/* question type*/}
                <div>
                    <label
                        htmlFor="questionType"
                        className="block text-sm font-medium text-gray-700 w-40"
                    >
                        Question type
                    </label>
                    <select
                        id="questionType"
                        name="questionType"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm
                        focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        onChange={onTypeChange}
                        value={model.type}
                    >
                        {questionTypes.map((type) => (
                            <option key={type} value={type}>{upperCaseFirst(type)}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Description */}
            <div>
                <label
                    htmlFor="questionDescription"
                    className="block text-sm font-medium text-gray-700"
                >
                    Description
                </label>
                <textarea
                    name="questionDescription"
                    id="questionDescription"
                    value={model.description || ""}
                    onChange={(event) => setModel({...model, description: event.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
                        focus:ring-indigo-500 sm:text-sm"
                >
                    </textarea>
            </div>

            <div>
                {shouldHaveOptions() && <div>
                    <h4 className="text-sm font-semibold mb-1 flex justify-between items-center">
                        Options
                        <button
                            type="button"
                            className="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
                            onClick={addOption}
                        >
                            Add
                        </button>
                    </h4>

                    {model.data.options.length === 0 && (<div className="text-xs text-gray-600 text-center py-3">
                        You don't have any options defined.
                    </div>)}

                    {model.data.options.length > 0 && <div>
                        {model.data.options.map((op, ind)=> (
                                <div key={op.uuid} className="flex items-center mb-1">
                                    <span className="w-6 text-sm">{ind+1}.</span>
                                    <input
                                        type="text"
                                        value={op.text}
                                        className="w-full rounded-sm py-1 px-2 text-xs border
                                        border-gray-300 focus:border-indigo-500"
                                        onInput={event => {op.text = event.target.value; setModel({...model})}}
                                    />
                                    <button type="button" className="h-6 w-6 rounded-full flex items-center justify-center
                                    border border-transparent transition-colors hover:border-red-100">
                                        <TrashIcon className="w-3 h-3 text-red-500" />
                                    </button>
                                </div>
                            ))}
                    </div>}

                </div>}
            </div>
        </div>
    )
}
