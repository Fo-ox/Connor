import { SVG_CONFIG, SvgIconType } from '@ngneat/svg-icon/lib/types';
import { SVG_SIZE_LG, SVG_SIZE_MD, SVG_SIZE_SM, SVG_SIZE_XS } from './size';
import * as singleColorIcon from '../svg/single-color-icons';
import * as multiColorIcon from '../svg/multi-color-icons';

export function getAllIcons(): SvgIconType[] {
  const icons: SvgIconType[] = [];
  for (const key in singleColorIcon) {
    // @ts-ignore
    icons.push(singleColorIcon[key]);
  }
  for (const key in multiColorIcon) {
    // @ts-ignore
    icons.push(multiColorIcon[key]);
  }
  return icons;
}

export const ICON_CONFIGURATION: SVG_CONFIG = {
  icons: getAllIcons(),
  defaultSize: 'md',
  color: '#000000',
  sizes: {
    xs: SVG_SIZE_XS,
    sm: SVG_SIZE_SM,
    md: SVG_SIZE_MD,
    lg: SVG_SIZE_LG,
  },
};
