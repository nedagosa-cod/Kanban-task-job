import IconTask from "../icons/IconTask";

export default function PanelTask({task, closePanelTask}) {

  return (
    <div 

      className="panel-bx-task"
      onClick={closePanelTask}
    >
      <div className="panel">
            <span className="panel__title"><IconTask /> <p>{task.content}</p></span>
            <div>

            </div>
      </div>
    </div>
  )
}
