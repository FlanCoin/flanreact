import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import "./AvatarGenerator.css";

// Definición de categorías y sus imágenes
const categories = {
  background: [
    "bar.png", "beach.jpg", "blue.png", "blue2.png", "blueyellow.png", "green.png",
    "greenpink.png", "grey.png", "lightblue.png", "lightorange.png", "orange.png",
    "pink.png", "purple.png", "river.png", "yellow.png", "yellow1.png", "yellow2.png"
  ],
  body: ["bodyblue.png", "bodygreen.png", "bodynude.png", "bodyred.png"],
  tshirt: [
    "adventuresuit.png", "bodysurf.png", "eurocopa.png", "flanballtshirt.png",
    "greyjacket.png", "hoodie.png", "kiss.png", "pirateshirt.png", "north.png",
    "sun.png", "superflan.png", "teshirtborgoña.png", "tshirtfrance.png",
    "tshirtgermany.png", "tshirtitaly.png", "tshirtspain.png", "flancoste.png", "wings.png"
  ],
  moustache: [
    "cigar.png", "furer.png", "furer2.png", "heisenberg.png", "heisenberg1.png",
    "moustache.png", "moustache1.png", "moustache2.png", "moustache5.png", "sanitarymask.png"
  ],
  hair: [
    "estandar.png", "afrohair.png", "bluehair.png", "braidhair.png", "brainhead.png", "explosionhead.png",
    "relaxhair.png", "superflanmask.png"
  ],
  headcomplements: [
    "baghead.png", "god.png", "seniorhatbase.png", "axehead.png", "cowboy.png", "deerantlers.png", "fathomer.png", "gorra10.png", "gorromdlr.png", "hat.png", "helmetflan.png",
    "horns.png"
  ],
  eyes: [
    "blueeyes.png", "closedeyes.png", "eyes.png", "eyesblood.png", "goldeyes.png",
    "hypnosis.png", "newlasereyes.png", "newmoneyeyes.png", "pinklaser.png",
    "redeyes.png", "xeyes.png"
  ],
  noise: ["nose.png", "piercing.png"],
  glasses: [
    "3dglasses.png", "dealwithit.png", "divingglasses.png",
    "glasses.png", "glasses3.png", "glasses4.png", "glasses5.png", "glasses6.png",
    "glassespotter.png", "monoculo.png", "starglasses.png"
  ]
};

const AvatarGenerator = () => {
  const [selectedItems, setSelectedItems] = useState({
    background: null,
    body: null,
    tshirt: null,
    moustache: null,
    hair: null,
    headcomplements: null,
    eyes: null,
    noise: null,
    glasses: null
  });
  const itemsRowRefs = useRef({});
  const [arrowVisibility, setArrowVisibility] = useState({});

  // Crear refs para cada categoría
  useEffect(() => {
    Object.keys(categories).forEach((category) => {
      itemsRowRefs.current[category] = React.createRef();
    });
  }, []);

  const getImagePath = (category, item) => {
    return `${process.env.PUBLIC_URL}/assets/avatares/${category}/${item}`;
  };

  const handleItemClick = useCallback((item, category) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: prev[category] === item ? null : item
    }));
  }, []);

  const handleScroll = useCallback((category, direction) => {
    const itemsRow = itemsRowRefs.current[category]?.current;
    if (itemsRow) {
      const scrollAmount = 100;
      itemsRow.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  }, []);

  const handleScrollEvent = useCallback((category) => {
    const itemsRow = itemsRowRefs.current[category]?.current;
    if (itemsRow) {
      const { scrollLeft, scrollWidth, clientWidth } = itemsRow;
      setArrowVisibility((prev) => ({
        ...prev,
        [category]: {
          left: scrollLeft > 0,
          right: scrollLeft + clientWidth < scrollWidth
        }
      }));
    }
  }, []);

  const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  useEffect(() => {
    Object.keys(categories).forEach((category) => {
      const itemsRow = itemsRowRefs.current[category]?.current;
      if (itemsRow) {
        const handleScrollThrottled = throttle(() => handleScrollEvent(category), 100);
        itemsRow.addEventListener("scroll", handleScrollThrottled);
        handleScrollEvent(category);

        return () => {
          itemsRow.removeEventListener("scroll", handleScrollThrottled);
        };
      }
    });
  }, [handleScrollEvent]);

  const downloadAvatar = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 1000;

    const images = Object.entries(selectedItems)
      .map(([key, value]) => {
        if (value) {
          const img = new Image();
          img.src = getImagePath(key, value);
          return img;
        }
        return null;
      })
      .filter((img) => img !== null);

    Promise.all(
      images.map(
        (img) =>
          new Promise((resolve) => {
            img.onload = () => resolve(img);
          })
      )
    ).then((loadedImages) => {
      loadedImages.forEach((img) => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      });
      const link = document.createElement("a");
      link.download = "flan_avatar.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  const generateRandomAvatar = useCallback(() => {
    const newSelectedItems = {};
    Object.keys(categories).forEach((category) => {
      const randomIndex = Math.floor(Math.random() * categories[category].length);
      newSelectedItems[category] = categories[category][randomIndex];
    });
    setSelectedItems(newSelectedItems);
  }, []);

  return (
    <div className="avatar-generator">
      <h2 className="section-title">Flan Generator</h2>
      <div className="category-container">
        <div className="categories">
          {Object.keys(categories).map((category) => (
            <div key={category} className="category">
              <h3 className="category-title">{category.toUpperCase()}</h3>
              <div className="items-row-wrapper">
                {arrowVisibility[category]?.left && (
                  <button className="arrow-button left" onClick={() => handleScroll(category, "left")}>
                    &#8249;
                  </button>
                )}
                <div className="items-row" ref={itemsRowRefs.current[category]}>
                  {categories[category].map((item) => (
                    <div
                      key={item}
                      className={`item-wrapper ${selectedItems[category] === item ? "selected-item" : ""}`}
                      onClick={() => handleItemClick(item, category)}
                    >
                      <img
                        src={getImagePath(category, item)}
                        alt={item}
                        className="avatar-item"
                      />
                    </div>
                  ))}
                </div>
                {arrowVisibility[category]?.right && (
                  <button className="arrow-button right" onClick={() => handleScroll(category, "right")}>
                    &#8250;
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="avatar-preview-container">
          <div className="avatar-preview">
            <div className="avatar-display">
              {Object.entries(selectedItems).map(([key, value]) =>
                value ? (
                  <img
                    key={key}
                    src={getImagePath(key, value)}
                    alt={value}
                    className={`avatar-layer ${key}`}
                  />
                ) : null
              )}
            </div>
            <div className="controls">
              <button className="random-button" onClick={generateRandomAvatar}>
                Random Avatar
              </button>
              <button className="download-button" onClick={downloadAvatar}>
                Download Avatar
              </button>
              <button
                className="clear-button"
                onClick={() =>
                  setSelectedItems({
                    background: null,
                    body: null,
                    tshirt: null,
                    moustache: null,
                    hair: null,
                    headcomplements: null,
                    eyes: null,
                    noise: null,
                    glasses: null
                  })
                }
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AvatarGenerator);
