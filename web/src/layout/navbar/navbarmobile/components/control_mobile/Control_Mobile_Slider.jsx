"use client";

import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  FaTimes,
  FaPalette,
  FaLanguage,
  FaTextHeight,
} from "react-icons/fa";

import { AiOutlineControl } from "react-icons/ai";

import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";

import ThemeSwitchMobile from "./ThemeSwitchMobile";
import LangSwitch_Mobile from "./LangSwitch_Mobile";
import FontChanger_Mobile from "./FontChanger_Mobile";

import "./Control_Mobile_Slider.css";

export default function Control_Mobile_Slider() {
  const { theme, themeName } =
    useTheme();

  const { t } =
    useLanguage();

  const [isOpen, setIsOpen] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("theme");

  const sliderRef =
    useRef(null);

  const dark =
    themeName === "dark" ||
    themeName === "midnight" ||
    themeName === "cyberpunk";

  const bg =
    theme?.background?.section ||
    (dark
      ? "bg-gray-900"
      : "bg-white");

  const border =
    dark
      ? "border-gray-700"
      : "border-gray-200";

  const text =
    theme?.textColors?.primary ||
    (dark
      ? "text-white"
      : "text-gray-900");

  const secondary =
    theme?.textColors
      ?.secondary ||
    (dark
      ? "text-gray-400"
      : "text-gray-500");

  const active =
    dark
      ? "bg-sky-500/20 text-sky-400"
      : "bg-sky-100 text-sky-600";

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow =
      "";
  };

  const open = () => {
    setIsOpen(true);
    document.body.style.overflow =
      "hidden";
  };

  useEffect(() => {
    const esc = (e) => {
      if (
        e.key === "Escape"
      ) {
        close();
      }
    };

    document.addEventListener(
      "keydown",
      esc
    );

    return () =>
      document.removeEventListener(
        "keydown",
        esc
      );
  }, []);

  useEffect(() => {
    const outside = (
      e
    ) => {
      if (
        isOpen &&
        sliderRef.current &&
        !sliderRef.current.contains(
          e.target
        )
      ) {
        close();
      }
    };

    document.addEventListener(
      "mousedown",
      outside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        outside
      );
  }, [isOpen]);

  const tab = (
    key,
    icon,
    label
  ) => (
    <button
      onClick={() =>
        setActiveTab(key)
      }
      className={`
      flex-1
      rounded-xl
      p-3
      flex
      flex-col
      items-center
      gap-1
      transition

      ${
        activeTab === key
          ? active
          : secondary
      }
      `}
    >
      {icon}

      <span className="text-[11px]">
        {label}
      </span>
    </button>
  );

  return (
    <>
      <button
        onClick={
          isOpen
            ? close
            : open
        }
        className="
        w-[42px]
        h-[42px]

        flex
        items-center
        justify-center
      "
      >
        <AiOutlineControl
          size={24}
          className={
            theme
              ?.textColors
              ?.highlight ||
            "text-sky-500"
          }
        />
      </button>

      {isOpen && (
        <div
          onClick={
            close
          }
          className="
          fixed
          inset-0
          bg-black/50
          z-[999]
        "
        />
      )}

      <aside
        ref={
          sliderRef
        }
        className={`
        control-mobile-slider

        fixed
        top-0
        right-0

        z-[1000]

        ${bg}
        ${border}

        ${
          isOpen
            ? "open"
            : ""
        }
      `}
      >
        {/* HEADER */}

        <div
          className={`
          shrink-0

          p-4

          border-b

          flex
          justify-between
          items-center

          ${border}
        `}
        >
          <div>
            <h3
              className={`font-bold ${text}`}
            >
              Customize
            </h3>

            <p
              className={`text-xs ${secondary}`}
            >
              Personalize
            </p>
          </div>

          <button
            onClick={
              close
            }
          >
            <FaTimes />
          </button>
        </div>

        {/* TABS */}

        <div
          className={`
          flex
          gap-2
          p-4
          border-b
          shrink-0

          ${border}
        `}
        >
          {tab(
            "theme",
            <FaPalette />,
            "Theme"
          )}

          {tab(
            "language",
            <FaLanguage />,
            "Language"
          )}

          {tab(
            "font",
            <FaTextHeight />,
            "Font"
          )}
        </div>

        {/* CONTENT */}

        <div className="control-mobile-content">

          {activeTab ===
            "theme" && (
            <ThemeSwitchMobile
              onClose={
                close
              }
            />
          )}

          {activeTab ===
            "language" && (
            <LangSwitch_Mobile
              onClose={
                close
              }
            />
          )}

          {activeTab ===
            "font" && (
            <FontChanger_Mobile
              onClose={
                close
              }
            />
          )}

        </div>

        {/* FOOTER */}

        <div
          className={`
          control-mobile-footer

          border-t

          ${border}
        `}
        >
          <p
            className={secondary}
          >
            Customize
            your reading
            experience
          </p>
        </div>
      </aside>
    </>
  );
}