import { Link } from "react-router";
import { items } from "../../data/containers";
import { useState } from "react";

const Main = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const renderImageItem = (item: any, index: number) => (
    <Link to={item.link} key={index} style={{ textDecoration: "none" }}>
      <div
        style={{
          position: "relative",
          width: "49.5vw",
          height: "50vw",
          overflow: "hidden",


          
          cursor: "pointer",
          filter: hoveredItem === index ? "brightness(70%)" : "none",
          transition: "filter 0.3s ease",
        }}
        onMouseEnter={() => setHoveredItem(index)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            height: "90vh",
            objectFit: "cover",
            display: "block",
          }}
        />
        {hoveredItem === index && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "xxx-large",
              fontWeight: "100",
              textShadow: "0 0 10px rgba(0,0,0,0.7)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {item.title}
          </div>
        )}
      </div>
    </Link>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* קונטיינר ראשון: items 0 ו־1 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          margin: 0,
          padding: 0,
          overflowX: "hidden",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {items.slice(0, 2).map((item, index) => renderImageItem(item, index))}
      </div>

      {/* קונטיינר שני: items 2 ו־3 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1vw",
        }}
      >
        {items.slice(2, 4).map((item, index) => renderImageItem(item, index + 2))}
      </div>
    </div>
  );
};

export default Main;
