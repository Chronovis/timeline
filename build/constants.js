"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSizes = [16, 32, 64, 128, 256];
exports.EVENT_HEIGHT = 16;
exports.LETTER_WIDTH = Math.round(exports.EVENT_HEIGHT * .1875 + 3.5);
exports.FONT_SIZE = Math.round(exports.EVENT_HEIGHT * .3125 + 6);
exports.ROW_SPACING = Math.round(exports.EVENT_HEIGHT / 3);
exports.EVENT_ROW_HEIGHT = exports.EVENT_HEIGHT + exports.ROW_SPACING;
exports.DATE_BAR_HEIGHT = exports.EVENT_ROW_HEIGHT;
exports.IMAGE_BOUNDING_BOX = (exports.EVENT_ROW_HEIGHT * 2) - exports.ROW_SPACING * 2;
exports.IMAGE_BORDER_SIZE = Math.round(exports.ROW_SPACING / 2);
exports.IMAGE_SIZE = exports.imageSizes.reduce((prev, curr) => Math.abs(curr - exports.IMAGE_BOUNDING_BOX) < Math.abs(prev - exports.IMAGE_BOUNDING_BOX) ? curr : prev);
exports.CENTER_CHANGE_DONE = 'CENTER_CHANGE_DONE';
exports.ZOOM_DONE = 'ZOOM_DONE';
exports.SCROLL_DONE = 'SCROLL_DONE';
exports.PIXELS_PER_LETTER = 8;
exports.DEFAULT_IMAGE_PATH = '/images';
class RawSegment {
}
exports.RawSegment = RawSegment;
exports.colors = [
    'rgba(211,84,0',
    'rgba(219,10,91',
    'rgba(31,58,147',
    'rgba(0,128,0'
].map(color => (opacity = 1) => `${color},${opacity})`);
