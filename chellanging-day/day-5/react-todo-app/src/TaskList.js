import { useState/*, useContext*/ } from 'react';
// context API
// import { TasksContext, TasksDispatchContext } from './TasksContext.js';
import { useTasks, useTasksDispatch } from './TasksContext.js';

export default function TaskList(/*{ tasks, onChangeTask, onDeleteTask}*/) {
  // context API
  // const tasks = useContext(TasksContext);
  const tasks = useTasks();
  
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            // onChange={onChangeTask}
            // onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, /*onChange, onDelete*/ }) {
  const [isEditing, setIsEditing] = useState(false);
  // context API
  // const dispatch = useContext(TasksDispatchContext);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      // 편집할 때 폼
      <>
        <input
          value={task.text}
          onChange={e => {
            // context API
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
            /*
            onChange({
              ...task,
              text: e.target.value
            });
            */
          }} />
        <button onClick={() => setIsEditing(false)}>
          Save
        </button>
      </>
    );
  } else {
    // 일반적으로 사용되는 폼
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </>
    );
  }
  return (
    // 체크박스 
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={e => {
          // context API
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
          /*
          onChange({
            ...task,
            done: e.target.checked
          });
          */
        }}
      />
      {taskContent}
      <button onClick={() => {
        // context API
        dispatch({
          type: 'deleted',
          id: task.id
        });
        // onDelete(task.id)
      }}>
        Delete
      </button>
    </label>
  );
}
