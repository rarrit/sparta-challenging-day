import { /*useContext,*/ useState } from 'react';
import { useTasksDispatch } from './TasksContext.js';
// import { TasksDispatchContext } from './TasksContext';

export default function AddTask({ onAddTask }) {
  // 문자열로 초기화
  const [text, setText] = useState('');

  // context API
  // const dispatch = useContext(TasksDispatchContext);
  const dispatch = useTasksDispatch();


  return (
    <>
      <input
        placeholder="Add task"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText(''); // text 문자열로 초기화
        // context API
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        })
        // onAddTask(text); // 부모 컴포넌트에 작업을 추가
      }}>Add</button>
    </>
  )
}


let nextId = 3;