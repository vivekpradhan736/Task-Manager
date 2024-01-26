// import "@/styles/globals.css";
import style from "@/styles/loading.module.css"

const Loading = () => {
  return (
    <div className="loading">
      <div className={style.spinner}></div>
    </div>
  )
}

export default Loading
