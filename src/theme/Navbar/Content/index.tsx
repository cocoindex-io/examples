import React, {useEffect} from 'react';
import {useThemeConfig, useColorMode} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import {FaBars} from 'react-icons/fa';
import type {Props as NavbarItemConfig} from '@theme/NavbarItem';
import styles from './styles.module.css';

export default function NavbarContent(): React.ReactElement {
  const mobileSidebar = useNavbarMobileSidebar();
  const {colorMode} = useColorMode();
  const {
    navbar: {items, logo, title},
  } = useThemeConfig();

  // Determine which logo to use based on theme
  const logoSrc = colorMode === 'dark' ? 'img/logo-dark.svg' : 'img/logo.svg';

  return (
    <div className={styles.navbarContainer}>
      {/* Mobile Menu Button - appears first on mobile */}
      <button
        className={styles.navbarMobileMenuButton}
        onClick={mobileSidebar.toggle}
        aria-label="Toggle navigation bar"
        aria-expanded={mobileSidebar.shown}
      >
        <FaBars className={styles.navbarMobileMenuIcon} />
      </button>

      {/* Logo */}
      <div className={styles.navbarBrand}>
        <Link to={logo?.href || '/'} className={styles.navbarLogoLink}>
          <img
            className={styles.navbarLogo}
            src={useBaseUrl(logoSrc)}
            alt={logo?.alt || title}
          />
        </Link>
      </div>

      {/* Desktop Navigation Items - Left */}
      <div className={styles.navbarItemsLeft}>
        {items
          .filter((item) => item.position === 'left')
          .map((item, i) => (
            <NavbarItem {...(item as NavbarItemConfig)} key={i} />
          ))}
      </div>

      {/* Right side items - pushed to the end */}
      <div className={styles.navbarItemsRight}>
        {/* Search Bar */}
        <div className={styles.navbarSearch}>
          <SearchBar />
        </div>

        {/* Right side items */}
        {items
          .filter((item) => item.position === 'right')
          .map((item, i) => (
            <NavbarItem {...(item as NavbarItemConfig)} key={i} />
          ))}

        {/* Color Mode Toggle */}
        <NavbarColorModeToggle className={styles.colorModeToggle} />
      </div>
    </div>
  );
}

