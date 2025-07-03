import { useState } from "react";
import ElasticSlider from "./ElasticSlider";

const Card = ({

    id,
    question,
    op1,
    op2,
    op3,
    op4,
    type,
    onAnswerSelect,
    className = ""
  
}) => {
  const [selected, setSelected] = useState(null); // 🟢 track selected option

  const handleSelect = (option) => {
    setSelected(option);
    onAnswerSelect(id, String(option)); // always string for MCQ
  };

  const optionStyle = (option) =>
    `border-2 py-[1.5rem] px-[1rem] rounded-2xl 
     transition-colors cursor-pointer duration-300
     ${selected === option ? 'border-blue-500 bg-blue-800 text-white' : 'border-neutral-600 hover:border-blue-600'}`;

  return (
    <div
      className={`relative rounded-3xl mt-[2rem] border border-neutral-800 bg-neutral-900 overflow-hidden p-8 ${className}`}
    >
      <div className="flex flex-col m-[1.5rem] ">
        <p className="raleway text-3xl font-semibold">{question}</p>
        {type === 'mcq' ? (
            <div className="raleway text-xl flex flex-col gap-8 mt-20">
                {[op1, op2, op3, op4].map((opt, idx) => (
                <div key={idx} onClick={() => handleSelect(opt)} className={optionStyle(opt)}>
                    <p>{opt}</p>
                </div>
                ))}
            </div>
        ) : (
            <div className=" mt-10 flex justify-center ">
                <ElasticSlider
                    id={id}
                    className=""
                    leftIcon={<>Disagree</>}
                    rightIcon={<>Agree</>}
                    startingValue={0}
                    defaultValue={50}
                    maxValue={100}
                    isStepped
                    stepSize={1}
                    onAnswerSelect={(id, val) => onAnswerSelect(id, val / 100)}
                />
            </div>
        )}
      </div>
    </div>
  );
};

export default Card;
