"use client";

import { forwardRef, type CSSProperties } from "react";
import styles from "./PageTransitionOverlay.module.css";
import type { PageTransitionConfig } from "./types";

type PageTransitionOverlayProps = {
  active: boolean;
  config: PageTransitionConfig;
};

const PageTransitionOverlay = forwardRef<HTMLDivElement, PageTransitionOverlayProps>(
  function PageTransitionOverlay({ active, config }, ref) {
    const {
      panelCount,
      direction,
      overlapPx,
      color,
      mode,
      text,
      imageSrc,
      textClassName,
    } = config;

    const vertical = direction === "vertical";
    const overlap = Math.max(0, overlapPx);

    return (
      <div
        ref={ref}
        className={`${styles.overlay} ${active ? styles.overlayActive : ""}`}
        aria-hidden={!active}
        style={{ ["--panel-color" as string]: color }}
      >
        <div
          className={`${styles.underlay} transition-underlay`}
          style={{ background: color }}
        />

        <div
          className={[
            styles.panelTrack,
            vertical ? styles.panelTrackVertical : styles.panelTrackHorizontal,
          ].join(" ")}
        >
          {Array.from({ length: panelCount }, (_, i) => {
            const mediaStyle: CSSProperties = vertical
              ? {
                  width: `${panelCount * 100}%`,
                  height: "100%",
                  left: `${-i * 100}%`,
                  top: 0,
                }
              : {
                  width: "100%",
                  height: `${panelCount * 100}%`,
                  top: `${-i * 100}%`,
                  left: 0,
                };

            const overlapStyle: CSSProperties = vertical
              ? {
                  flex: "0 0 auto",
                  width: `calc((100% + ${(panelCount - 1) * overlap}px) / ${panelCount})`,
                  marginRight: i < panelCount - 1 ? -overlap : 0,
                }
              : {
                  flex: "0 0 auto",
                  height: `calc((100% + ${(panelCount - 1) * overlap}px) / ${panelCount})`,
                  marginBottom: i < panelCount - 1 ? -overlap : 0,
                };

            return (
              <div
                key={i}
                className={[
                  styles.panel,
                  "transition-panel",
                  vertical ? styles.panelVertical : styles.panelHorizontal,
                ].join(" ")}
                data-panel={i}
                style={overlapStyle}
              >
                {mode === "image" && imageSrc ? (
                  <div
                    className={`${styles.panelMedia} ${styles.panelMediaImage}`}
                    style={{
                      ...mediaStyle,
                      backgroundImage: `url(${imageSrc})`,
                    }}
                  />
                ) : null}

                {mode === "text" && text ? (
                  <div
                    className={`${styles.panelMedia} ${styles.panelMediaText} ${textClassName ?? ""}`}
                    style={mediaStyle}
                  >
                    {text}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default PageTransitionOverlay;
