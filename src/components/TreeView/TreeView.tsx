import { useState } from "react";
import explorer, { DataExplorerTypes } from "./Data";
import { FaFolder, FaFile } from "react-icons/fa6";

// TreeView Component
const TreeView = () => {
  return (
    <div
      style={{
        margin: "auto",
        width: 500,
        marginTop: 78,
        border: "1px solid white",
        padding: 10,
        borderRadius: 5,
        minHeight: 150,
        transition: "height 1s ease",
      }}
    >
      <h1 style={{ textAlign: "center" }}>TreeView</h1>
      <div>
        {explorer &&
          explorer.map((data, index) => {
            return <Tree key={index} data={data} />;
          })}
      </div>
    </div>
  );
};

// Tree Component
export const Tree = ({
  data,
  isChild = false,
}: {
  data: DataExplorerTypes;
  isChild?: boolean;
}) => {
  const [showChild, setShowChild] = useState(false);

  return (
    <div style={{ marginLeft: isChild ? "20px" : "0" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {data.children?.length ? (
          <FaFolder
            onClick={() => setShowChild((prev) => !prev)}
            color="yellow"
            style={{ margin: 4, cursor: "pointer" }}
          />
        ) : (
          <FaFile color="blue" style={{ margin: 4 }} />
        )}
        <span>{data.name}</span>
      </div>
      {data.children && data.children.length > 0 && (
        <div style={{ marginLeft: "20px", transition: "all .5s ease-in-out" }}>
          {showChild &&
            data.children.map((child, index) => (
              <Tree key={index} data={child} isChild={true} />
            ))}
        </div>
      )}
    </div>
  );
};

export default TreeView;
