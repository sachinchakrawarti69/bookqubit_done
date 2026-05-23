"use client";

import React, { useState, useRef, useEffect } from "react";

import {
  FaTimes,
  FaPalette,
  FaLanguage,
  FaTextHeight,
} from "react-icons/fa";

import { AiOutlineControl } from "react-icons/ai";

import { useTheme } from "@/themes/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRTL } from "@/contexts/RTLContext";

import ThemeSwitchMobile from "../themeswitch_mobile/ThemeSwitchMobile";
import LangSwitch_Mobile from "../langswitch_mobile/LangSwitch_Mobile";
import FontChanger_Mobile from "../fontchanger_mobile/FontChanger_Mobile";

import "./Control_Mobile_Slider.css";

export default function Control_Mobile_Slider() {
  const { theme, themeName } =
    useTheme();

  useLanguage();

  const { direction } =
    useRTL();

  const [isOpen, setIsOpen] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("theme");

  const sliderRef =
    useRef(null);

  const dark =
    [
      "dark",
      "midnight",
      "cyberpunk",
    ].includes(themeName);

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
    theme?.textColors?.secondary ||
    (dark
      ? "text-gray-400"
      : "text-gray-500");

  const active =
    dark
      ? "bg-sky-500/20 text-sky-400"
      : "bg-sky-100 text-sky-600";

  const lockScroll = () => {
    document.body.classList.add(
      "slider-open"
    );

    document.documentElement.classList.add(
      "slider-open"
    );
  };

  const unlockScroll =
    () => {
      document.body.classList.remove(
        "slider-open"
      );

      document.documentElement.classList.remove(
        "slider-open"
      );
    };

  const open = () => {
    setIsOpen(true);
    lockScroll();
  };

  const close = () => {
    setIsOpen(false);
    unlockScroll();
  };

  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape")
        close();
    };

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
      "keydown",
      esc
    );

    document.addEventListener(
      "mousedown",
      outside
    );

    return () => {
      document.removeEventListener(
        "keydown",
        esc
      );

      document.removeEventListener(
        "mousedown",
        outside
      );
    };
  }, [isOpen]);

  const tab = (
    key,
    Icon,
    label
  ) => (
    <button
      key={key}
      onClick={() =>
        setActiveTab(key)
      }
      className={`
      flex-1

      p-3

      rounded-xl

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
      <Icon />

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
          className="
          fixed
          inset-0
          bg-black/40
          z-[999]
        "
          onClick={
            close
          }
        />
      )}

      <aside
        ref={sliderRef}
        dir={direction}
        className={`
        control-mobile-slider

        ${
          isOpen
            ? "open"
            : ""
        }

        ${bg}

        border-l

        ${border}
      `}
      >
        <div
          className={`
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

        <div
          className={`
          flex

          gap-2

          p-4

          border-b

          ${border}
        `}
        >
          {tab(
            "theme",
            FaPalette,
            "Theme"
          )}

          {tab(
            "language",
            FaLanguage,
            "Language"
          )}

          {tab(
            "font",
            FaTextHeight,
            "Font"
          )}
        </div>

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
            Customize your reading experience
          </p>
        </div>
      </aside>
    </>
  );
}