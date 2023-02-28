import "./App.css";
import FolderTree, { testData } from "react-folder-tree";
function App() {
  const onTreeStateChange = (state, event) => console.log(state, event);
  return (
    <div className="App">
      <FolderTree data={testData} onChange={onTreeStateChange} showCheckbox={ false }/>
    </div>
  );
}

export default App;
