import { useReducer } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
  const [tasks, dispatch] = useReducer(
    tasksReducer, // 상태 업데이트 로직
    initialTasks // 초기 상태로 설정
  );

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <h1>Day off in Kyoto</h1>
        <AddTask />
        <TaskList />
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );

  /*
  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text, 
    });
  }
  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task 
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
    
  }

  return (
    <>
      <h1>Day off in Kyoto</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
  */
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': { // 작업 추가 액션
      return [...tasks, { // 기존 task 원본 유지
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task; // 업데이트
        } else {
          return t; // 유지
        }
      });
    }
    case 'deleted': { // 삭제 
      return tasks.filter(t => t.id !== action.id);
    }
    default: { // 타입 없을 경우 
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3; 
const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];


