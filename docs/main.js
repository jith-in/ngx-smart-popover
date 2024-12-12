"use strict";
(self["webpackChunkngx_smart_popover_demo"] = self["webpackChunkngx_smart_popover_demo"] || []).push([["main"],{

/***/ 7913:
/*!*************************************************************************!*\
  !*** ./projects/ngx-smart-popover/src/lib/popover-content.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopoverContentComponent: () => (/* binding */ PopoverContentComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _popover_placement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popover.placement */ 4473);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 316);
/**
 * This is a continuation of ngx-popover
 * @Reference {github} https://github.com/pleerock/ngx-popover
 */




const _c0 = ["popoverDiv"];
const _c1 = ["*"];
const _c2 = (a0, a1, a2, a3, a4) => ({
  "sm": a0,
  "md-sm": a1,
  "md": a2,
  "lg": a3,
  "in": a4
});
class PopoverContentComponent {
  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------
  constructor(element, cdr, renderer) {
    this.element = element;
    this.cdr = cdr;
    this.renderer = renderer;
    this.placement = _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Top;
    this.animation = true;
    this.closeOnClickOutside = false;
    this.closeOnMouseOutside = false;
    this.appendToBody = false;
    this.size = 'small';
    this.onCloseFromOutside = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.top = -10000;
    this.left = -10000;
    this.isIn = false;
    this.opacity = 0;
    this.transitionEnabled = false;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    // -------------------------------------------------------------------------
    // Anonymous
    // -------------------------------------------------------------------------
    /**
     * Closes dropdown if user clicks outside of this directive.
     */
    this.onDocumentMouseDown = event => {
      const element = this.element.nativeElement;
      if (!element || !this.popover) {
        return;
      }
      if (element.contains(event.target) || this.popover.getElement().contains(event.target)) {
        return;
      }
      this.onCloseFromOutside.emit(undefined);
    };
  }
  // -------------------------------------------------------------------------
  // Lifecycle callbacks
  // -------------------------------------------------------------------------
  ngAfterViewInit() {
    if (this.closeOnClickOutside) {
      this.listenClickFunc = this.renderer.listen('document', 'mousedown', event => this.onDocumentMouseDown(event));
    }
    if (this.closeOnMouseOutside) {
      this.listenMouseFunc = this.renderer.listen('document', 'mouseover', event => this.onDocumentMouseDown(event));
    }
    // Always close on mobile touch event outside.
    this.listenTouchFunc = this.renderer.listen('document', 'touchstart', event => this.onDocumentMouseDown(event));
    this.show();
    this.cdr.detectChanges();
  }
  ngOnDestroy() {
    if (this.closeOnClickOutside && this.listenClickFunc) {
      this.listenClickFunc();
    }
    if (this.closeOnMouseOutside && this.listenMouseFunc) {
      this.listenMouseFunc();
    }
    if (!!this.listenTouchFunc) {
      this.listenTouchFunc();
    }
  }
  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------
  onResize(event) {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }
  updatePosition() {
    // if visible, reposition
    if (this.opacity) {
      const p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
      this.top = p.top;
      this.left = p.left;
    }
  }
  show() {
    if (!this.popover || !this.popover.getElement()) {
      return;
    }
    const p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
    this.top = p.top;
    this.left = p.left;
    this.isIn = true;
    this.transitionEnabled = true;
    this.opacity = 1;
  }
  hide() {
    this.top = -10000;
    this.left = -10000;
    this.isIn = true;
    this.popover.hide();
  }
  hideFromPopover() {
    this.top = -10000;
    this.left = -10000;
    this.isIn = true;
    this.transitionEnabled = false;
    this.opacity = 0;
  }
  // -------------------------------------------------------------------------
  // Protected Methods
  // -------------------------------------------------------------------------
  positionElements(hostEl, targetEl, positionStr, appendToBody = false) {
    const positionStrParts = positionStr.split(' ');
    let pos0 = positionStrParts[0];
    const pos1 = positionStrParts[1] || 'center';
    const hostElPos = this.appendToBody || appendToBody ? this.offset(hostEl) : this.position(hostEl);
    const targetElWidth = targetEl.offsetWidth;
    const targetElHeight = targetEl.offsetHeight;
    this.effectivePlacement = pos0 = this.getEffectivePlacement(pos0, hostEl, targetEl);
    const shiftWidth = {
      center: function () {
        return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
      },
      left: function () {
        return hostElPos.left;
      },
      right: function () {
        return hostElPos.left + hostElPos.width;
      },
      topOrBottomRight: function () {
        return hostElPos.left + hostElPos.width / 2;
      },
      topOrBottomLeft: function () {
        return hostElPos.left - targetElWidth + hostElPos.width / 2;
      }
    };
    const shiftHeight = {
      center: function () {
        return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
      },
      top: function () {
        return hostElPos.top;
      },
      bottom: function () {
        return hostElPos.top + hostElPos.height;
      }
    };
    let targetElPos;
    switch (pos0) {
      case _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Right:
        targetElPos = {
          top: shiftHeight[pos1](),
          left: shiftWidth[pos0]()
        };
        break;
      case _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Left:
        targetElPos = {
          top: shiftHeight[pos1](),
          left: hostElPos.left - targetElWidth
        };
        break;
      case _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom:
        targetElPos = {
          top: shiftHeight[pos0](),
          left: shiftWidth[pos1]()
        };
        break;
      case _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopLeft:
        targetElPos = {
          top: hostElPos.top - targetElHeight,
          left: shiftWidth['topOrBottomLeft']()
        };
        break;
      case _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopRight:
        targetElPos = {
          top: hostElPos.top - targetElHeight,
          left: shiftWidth['topOrBottomRight']()
        };
        break;
      case _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomLeft:
        targetElPos = {
          top: shiftHeight[_popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom](),
          left: shiftWidth['topOrBottomLeft']()
        };
        break;
      case _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomRight:
        targetElPos = {
          top: shiftHeight[_popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom](),
          left: shiftWidth['topOrBottomRight']()
        };
        break;
      default:
        targetElPos = {
          top: hostElPos.top - targetElHeight,
          left: shiftWidth[pos1]()
        };
        break;
    }
    return targetElPos;
  }
  position(nativeEl) {
    let offsetParentBCR = {
      top: 0,
      left: 0
    };
    const elBCR = this.offset(nativeEl);
    const offsetParentEl = this.parentOffsetEl(nativeEl);
    if (offsetParentEl !== window.document) {
      offsetParentBCR = this.offset(offsetParentEl);
      offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
      offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
    }
    const boundingClientRect = nativeEl.getBoundingClientRect();
    return {
      width: boundingClientRect.width || nativeEl.offsetWidth,
      height: boundingClientRect.height || nativeEl.offsetHeight,
      top: elBCR.top - offsetParentBCR.top,
      left: elBCR.left - offsetParentBCR.left
    };
  }
  offset(nativeEl) {
    const boundingClientRect = nativeEl.getBoundingClientRect();
    return {
      width: boundingClientRect.width || nativeEl.offsetWidth,
      height: boundingClientRect.height || nativeEl.offsetHeight,
      top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
      left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
    };
  }
  getStyle(nativeEl, cssProp) {
    if (nativeEl.currentStyle) {
      // IE
      return nativeEl.currentStyle[cssProp];
    }
    if (window.getComputedStyle) {
      return window.getComputedStyle(nativeEl)[cssProp];
    }
    // finally try and get inline style
    return nativeEl.style[cssProp];
  }
  isStaticPositioned(nativeEl) {
    return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
  }
  parentOffsetEl(nativeEl) {
    let offsetParent = nativeEl.offsetParent || window.document;
    while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
      offsetParent = offsetParent.offsetParent;
    }
    return offsetParent || window.document;
  }
  // Check for overflow of the viewport and reflect the position if necessary.
  getEffectivePlacement(placement, hostElement, targetElement) {
    const hostElBoundingRect = hostElement.getBoundingClientRect();
    const desiredPlacement = placement || _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Top;
    // Determines if a popover overflows in a direction when in a specific position.
    const overflows = {
      positionTop: {
        top: hostElBoundingRect.top - targetElement.offsetHeight < 0,
        right: hostElBoundingRect.left + hostElBoundingRect.width / 2 + targetElement.offsetWidth / 2 > this.windowWidth,
        left: hostElBoundingRect.left + hostElBoundingRect.width / 2 - targetElement.offsetWidth / 2 < 0
      },
      positionTopRight: {
        top: hostElBoundingRect.top - targetElement.offsetHeight < 0,
        right: hostElBoundingRect.right + targetElement.offsetWidth > this.windowWidth
      },
      positionRight: {
        top: hostElBoundingRect.top + hostElBoundingRect.height / 2 - targetElement.offsetHeight / 2 < 0,
        right: hostElBoundingRect.right + targetElement.offsetWidth > this.windowWidth,
        bottom: hostElBoundingRect.top + hostElBoundingRect.height / 2 + targetElement.offsetHeight / 2 > this.windowHeight
      },
      positionBottomRight: {
        right: hostElBoundingRect.right + targetElement.offsetWidth > this.windowWidth,
        bottom: hostElBoundingRect.bottom + targetElement.offsetHeight > this.windowHeight
      },
      positionBottom: {
        right: hostElBoundingRect.left + hostElBoundingRect.width / 2 + targetElement.offsetWidth / 2 > this.windowWidth,
        bottom: hostElBoundingRect.bottom + targetElement.offsetHeight > this.windowHeight,
        left: hostElBoundingRect.left + hostElBoundingRect.width / 2 - targetElement.offsetWidth / 2 < 0
      },
      positionBottomLeft: {
        bottom: hostElBoundingRect.bottom + targetElement.offsetHeight > this.windowHeight,
        left: hostElBoundingRect.left - targetElement.offsetWidth < 0
      },
      positionLeft: {
        left: hostElBoundingRect.left < targetElement.offsetWidth,
        top: hostElBoundingRect.top + hostElBoundingRect.height / 2 - targetElement.offsetHeight / 2 < 0,
        bottom: hostElBoundingRect.top + hostElBoundingRect.height / 2 + targetElement.offsetHeight / 2 > this.windowHeight
      },
      positionTopLeft: {
        top: hostElBoundingRect.top - targetElement.offsetHeight < 0,
        left: hostElBoundingRect.left - targetElement.offsetWidth < 0
      }
    };
    if (desiredPlacement === _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Top) {
      // If it overflows on the top AND left, go to bottom-right.
      if (overflows.positionTop.top && overflows.positionTop.left) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomRight;
        // If it overflows on the top AND right, go to bottom-left.
      } else if (overflows.positionTop.top && overflows.positionTop.right) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomLeft;
        // If it only overflows on the top, go to bottom.
      } else if (overflows.positionTop.top) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom;
        // If it only overflows to the right, go to top-left.
      } else if (overflows.positionTop.right) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopLeft;
        // If it only overflows to the left, go to top-right.
      } else if (overflows.positionTop.left) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopRight;
      } else {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Top;
      }
    }
    if (desiredPlacement === _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopRight) {
      // If it overflows on the top AND the right, try in the order: bottom, Bottom-left, left.
      if (overflows.positionTopRight.top && overflows.positionTopRight.right) {
        if (overflows.positionBottom.bottom) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Left;
        } else if (overflows.positionBottom.right) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomLeft;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom;
        }
        // If it only overflows on the top, try in the order: right, bottom-right.
      } else if (overflows.positionTopRight.top) {
        if (overflows.positionRight.top) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomRight;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Right;
        }
        // If it only overflows on the right, try in the order: top, top-left.
      } else if (overflows.positionTopRight.right) {
        if (overflows.positionTop.right) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopLeft;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Top;
        }
      } else {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopRight;
      }
    }
    if (desiredPlacement === _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Right) {
      // If it overflows on the right AND the top, try in the order: bottom-right, bottom, bottom-left.
      if (overflows.positionRight.right && overflows.positionRight.top) {
        if (overflows.positionBottomRight.right && overflows.positionBottom.right) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomLeft;
        } else if (overflows.positionBottomRight.right) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomRight;
        }
        // If it overflows on the right AND the bottom, try in the order: top-right, top, top-left.
      } else if (overflows.positionRight.right && overflows.positionRight.bottom) {
        if (overflows.positionTopRight.right && overflows.positionTop.right) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopLeft;
        } else if (overflows.positionTopRight.right) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Top;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopRight;
        }
        // If it only overflows on the right, try all top positions from right to left, then try all bottom positions right to left.
      } else if (overflows.positionRight.right) {
        if (overflows.positionTop.top) {
          if (overflows.positionBottom.right) {
            return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomLeft;
          } else if (overflows.positionBottomRight.right) {
            return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom;
          } else {
            return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomRight;
          }
        } else {
          if (overflows.positionTop.right) {
            return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopLeft;
          } else if (overflows.positionTopRight.right) {
            return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Top;
          } else {
            return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopRight;
          }
        }
        // If it only over flows on the top, go bottom-right.
      } else if (overflows.positionRight.top) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomRight;
        // If it only overflows on the bottom, go top-right.
      } else if (overflows.positionRight.bottom) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopRight;
      } else {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Right;
      }
    }
    if (desiredPlacement === _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomRight) {
      // If it overflows on the bottom AND the right, try in the order: top, top-left, left.
      if (overflows.positionBottomRight.bottom && overflows.positionBottomRight.right) {
        if (overflows.positionTop.top) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Left;
        } else if (overflows.positionTop.right) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopLeft;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Top;
        }
        // If it only overflows on the bottom, try in the order: right, top-right.
      } else if (overflows.positionBottomRight.bottom) {
        if (overflows.positionRight.bottom) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopRight;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Right;
        }
        // If it only overflows on the right, try in the order: bottom, bottom-left.
      } else if (overflows.positionBottomRight.right) {
        if (overflows.positionBottom.right) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomLeft;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom;
        }
      } else {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomRight;
      }
    }
    if (desiredPlacement === _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom) {
      // If it overflows on the bottom AND left, go to top-right.
      if (overflows.positionBottom.bottom && overflows.positionBottom.left) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopRight;
        // If it overflows on the bottom AND right, go to top-left.
      } else if (overflows.positionBottom.bottom && overflows.positionBottom.right) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopLeft;
        // If it only overflows on the bottom, go to top.
      } else if (overflows.positionBottom.bottom) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Top;
        // If it only overflows to the right, go to bottom-left.
      } else if (overflows.positionBottom.right) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomLeft;
        // If it only overflows to the left, go to bottom-right.
      } else if (overflows.positionBottom.left) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomRight;
      } else {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom;
      }
    }
    if (desiredPlacement === _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomLeft) {
      // If it overflows on the bottom AND the left, try in the order: top, top-right, right.
      if (overflows.positionBottomLeft.bottom && overflows.positionBottomLeft.left) {
        if (overflows.positionTop.top) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Right;
        } else if (overflows.positionTop.left) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopRight;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Top;
        }
        // If it only overflows on the bottom, try in the order: left, top-left.
      } else if (overflows.positionBottomLeft.bottom) {
        if (overflows.positionLeft.bottom) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopLeft;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Left;
        }
        // If it only overflows on the left, try in the order: bottom, bottom-right.
      } else if (overflows.positionBottomLeft.left) {
        if (overflows.positionBottom.left) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomRight;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom;
        }
      } else {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomLeft;
      }
    }
    if (desiredPlacement === _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Left) {
      // If it overflows on the left AND the top, try in the order: bottom-left, bottom, bottom-right.
      if (overflows.positionLeft.left && overflows.positionLeft.top) {
        if (overflows.positionBottomLeft.left && overflows.positionBottom.left) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomRight;
        } else if (overflows.positionBottomRight.right) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomLeft;
        }
        // If it overflows on the left AND the bottom, try in the order: top-left, top, top-right.
      } else if (overflows.positionLeft.left && overflows.positionLeft.bottom) {
        if (overflows.positionTopLeft.left && overflows.positionTop.left) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopRight;
        } else if (overflows.positionTopLeft.left) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Top;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopLeft;
        }
        // If it only overflows on the left, try all top positions from left to right, then try all bottom positions left to right.
      } else if (overflows.positionLeft.left) {
        if (overflows.positionTop.top) {
          if (overflows.positionBottom.left) {
            return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomRight;
          } else if (overflows.positionBottomLeft.left) {
            return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom;
          } else {
            return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomLeft;
          }
        } else {
          if (overflows.positionTop.left) {
            return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopRight;
          } else if (overflows.positionTopLeft.left) {
            return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Top;
          } else {
            return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopLeft;
          }
        }
        // If it only over flows on the top, go bottom-left.
      } else if (overflows.positionLeft.top) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomLeft;
        // If it only overflows on the bottom, go top-left.
      } else if (overflows.positionLeft.bottom) {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopLeft;
      } else {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Left;
      }
    }
    if (desiredPlacement === _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopLeft) {
      // If it overflows on the top AND the left, try in the order: bottom, Bottom-right, right.
      if (overflows.positionTopLeft.top && overflows.positionTopLeft.left) {
        if (overflows.positionBottom.bottom) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Right;
        } else if (overflows.positionBottom.left) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomRight;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Bottom;
        }
        // If it only overflows on the top, try in the order: left, bottom-left.
      } else if (overflows.positionTopLeft.top) {
        if (overflows.positionLeft.top) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.BottomLeft;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Left;
        }
        // If it only overflows on the left, try in the order: top, top-right.
      } else if (overflows.positionTopLeft.left) {
        if (overflows.positionTop.left) {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopRight;
        } else {
          return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.Top;
        }
      } else {
        return _popover_placement__WEBPACK_IMPORTED_MODULE_0__.PopoverPlacement.TopLeft;
      }
    }
    return desiredPlacement;
  }
  static {
    this.ɵfac = function PopoverContentComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PopoverContentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Renderer2));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: PopoverContentComponent,
      selectors: [["popover-content"]],
      viewQuery: function PopoverContentComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 7);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.popoverDiv = _t.first);
        }
      },
      hostBindings: function PopoverContentComponent_HostBindings(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("resize", function PopoverContentComponent_resize_HostBindingHandler($event) {
            return ctx.onResize($event);
          }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"]);
        }
      },
      inputs: {
        content: "content",
        placement: "placement",
        title: "title",
        parentClass: "parentClass",
        animation: "animation",
        closeOnClickOutside: "closeOnClickOutside",
        closeOnMouseOutside: "closeOnMouseOutside",
        appendToBody: "appendToBody",
        size: "size"
      },
      ngContentSelectors: _c1,
      decls: 9,
      vars: 26,
      consts: [["popoverDiv", ""], ["role", "popover", 3, "ngClass"], [1, "virtual-area", 3, "hidden"], [1, "arrow"], [1, "popover-header", 3, "hidden"], [1, "popover-body"]],
      template: function PopoverContentComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 1, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 2)(3, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMapInterpolate2"]("bs-popover-", ctx.effectivePlacement, " popover-content popover ", ctx.parentClass, "");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("top", ctx.top, "px")("left", ctx.left, "px")("transition", ctx.transitionEnabled ? "0.15s opacity" : "")("opacity", ctx.opacity)("display", "block");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction5"](20, _c2, ctx.size === "small", ctx.size === "medium-small", ctx.size === "medium", ctx.size === "large", ctx.isIn));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-hidden", ctx.opacity === 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("hidden", !ctx.closeOnMouseOutside);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("hidden", !ctx.title);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.title);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.content, " ");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgClass],
      encapsulation: 2
    });
  }
}

/***/ }),

/***/ 5899:
/*!*****************************************************************!*\
  !*** ./projects/ngx-smart-popover/src/lib/popover.directive.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopoverDirective: () => (/* binding */ PopoverDirective)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _popover_content_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popover-content.component */ 7913);
/**
 * This is a continuation of ngx-popover
 * @Reference {github} https://github.com/pleerock/ngx-popover
 */



/**
* @group Basic Toolkit
* @component Popover Directive
*/
class PopoverDirective {
  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------
  constructor(viewContainerRef, cdr, resolver, appRef, injector) {
    this.viewContainerRef = viewContainerRef;
    this.cdr = cdr;
    this.resolver = resolver;
    this.appRef = appRef;
    this.injector = injector;
    // -------------------------------------------------------------------------
    // Properties
    // -------------------------------------------------------------------------
    this.popoverContentComponent = _popover_content_component__WEBPACK_IMPORTED_MODULE_0__.PopoverContentComponent;
    this.popoverOnHover = true;
    this.popoverDismissTimeout = 0;
    this.onShown = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
    this.onHidden = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
  }
  // -------------------------------------------------------------------------
  // Event listeners
  // -------------------------------------------------------------------------
  showOrHideOnClick(evt) {
    if (this.popoverOnHover) {
      return;
    }
    if (this.popoverDisabled) {
      return;
    }
    evt.stopImmediatePropagation();
    this.toggle();
  }
  showOrHideOnTouch(evt) {
    evt.stopImmediatePropagation();
    if (!this.popoverOnHover) {
      return;
    }
    if (this.popoverDisabled) {
      return;
    }
    this.toggle();
  }
  showOnHover() {
    if (!this.popoverOnHover) {
      return;
    }
    if (this.popoverDisabled) {
      return;
    }
    this.show();
  }
  hideOnHover() {
    if (this.popoverCloseOnMouseOutside) {
      return; // don't do anything since we do not control this
    }
    if (!this.popoverOnHover) {
      return;
    }
    if (this.popoverDisabled) {
      return;
    }
    this.hide();
  }
  ngOnChanges(changes) {
    if (changes['popoverDisabled']) {
      if (changes['popoverDisabled'].currentValue) {
        this.hide();
      }
    }
  }
  createComponent(component) {
    const factory = this.resolver.resolveComponentFactory(component);
    // Create a component reference from the component
    const componentRef = this.appendToBody ? factory.create(this.injector) : this.viewContainerRef.createComponent(factory);
    if (this.appendToBody) {
      // Attach component to the appRef so that it's inside the ng component tree
      this.appRef.attachView(componentRef.hostView);
      // Get DOM element from component
      const domElem = componentRef.hostView.rootNodes[0];
      // Append DOM element to the body
      document.body.appendChild(domElem);
    }
    return componentRef;
  }
  removeComponent(componentRef) {
    if (this.popover) {
      if (this.appendToBody) {
        this.appRef.detachView(componentRef.hostView);
      }
      componentRef.destroy();
    }
  }
  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------
  toggle() {
    if (!this.visible) {
      this.show();
    } else {
      this.hide();
    }
  }
  show() {
    if (this.visible) {
      return;
    }
    this.visible = true;
    if (typeof this.content === 'string') {
      if (!this.visible) {
        return;
      }
      this.popover = this.createComponent(this.popoverContentComponent);
      const popover = this.popover.instance;
      popover.popover = this;
      popover.content = this.content;
      if (this.popoverPlacement !== undefined) {
        popover.placement = this.popoverPlacement;
      }
      if (this.popoverAnimation !== undefined) {
        popover.animation = this.popoverAnimation;
      }
      if (this.popoverTitle !== undefined) {
        popover.title = this.popoverTitle;
      }
      if (this.popoverCloseOnClickOutside !== undefined) {
        popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
      }
      if (this.popoverCloseOnMouseOutside !== undefined) {
        popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;
      }
      if (this.popoverSize) {
        popover.size = this.popoverSize;
      }
      popover.appendToBody = this.appendToBody;
      popover.onCloseFromOutside.subscribe(() => this.hide());
      // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
      if (this.popoverDismissTimeout > 0) {
        setTimeout(() => this.hide(), this.popoverDismissTimeout);
      }
    } else {
      const popover = this.content;
      popover.popover = this;
      if (this.popoverPlacement !== undefined) {
        popover.placement = this.popoverPlacement;
      }
      if (this.popoverAnimation !== undefined) {
        popover.animation = this.popoverAnimation;
      }
      if (this.popoverTitle !== undefined) {
        popover.title = this.popoverTitle;
      }
      if (this.popoverCloseOnClickOutside !== undefined) {
        popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
      }
      if (this.popoverCloseOnMouseOutside !== undefined) {
        popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;
      }
      if (this.popoverSize) {
        popover.size = this.popoverSize;
      }
      popover.appendToBody = this.appendToBody;
      popover.onCloseFromOutside.subscribe(() => this.hide());
      // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
      if (this.popoverDismissTimeout > 0) {
        setTimeout(() => this.hide(), this.popoverDismissTimeout);
      }
      popover.show();
    }
    this.cdr.detectChanges();
    this.onShown.emit(this);
  }
  hide() {
    if (!this.visible) {
      return;
    }
    this.visible = false;
    this.removeComponent(this.popover);
    if (this.content instanceof _popover_content_component__WEBPACK_IMPORTED_MODULE_0__.PopoverContentComponent) {
      this.content.hideFromPopover();
    }
    this.cdr.detectChanges();
    this.onHidden.emit(this);
  }
  getElement() {
    return this.viewContainerRef.element.nativeElement;
  }
  static {
    this.ɵfac = function PopoverDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PopoverDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ComponentFactoryResolver), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ApplicationRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injector));
    };
  }
  static {
    this.ɵdir = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({
      type: PopoverDirective,
      selectors: [["", "popover", ""]],
      hostBindings: function PopoverDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function PopoverDirective_click_HostBindingHandler($event) {
            return ctx.showOrHideOnClick($event);
          })("touchend", function PopoverDirective_touchend_HostBindingHandler($event) {
            return ctx.showOrHideOnTouch($event);
          })("focusin", function PopoverDirective_focusin_HostBindingHandler() {
            return ctx.showOnHover();
          })("mouseenter", function PopoverDirective_mouseenter_HostBindingHandler() {
            return ctx.showOnHover();
          })("focusout", function PopoverDirective_focusout_HostBindingHandler() {
            return ctx.hideOnHover();
          })("mouseleave", function PopoverDirective_mouseleave_HostBindingHandler() {
            return ctx.hideOnHover();
          });
        }
      },
      inputs: {
        content: [0, "popover", "content"],
        popoverSize: "popoverSize",
        popoverDisabled: "popoverDisabled",
        popoverAnimation: "popoverAnimation",
        popoverPlacement: "popoverPlacement",
        popoverTitle: "popoverTitle",
        popoverOnHover: "popoverOnHover",
        popoverCloseOnClickOutside: "popoverCloseOnClickOutside",
        popoverCloseOnMouseOutside: "popoverCloseOnMouseOutside",
        popoverDismissTimeout: "popoverDismissTimeout",
        appendToBody: "appendToBody"
      },
      outputs: {
        onShown: "onShown",
        onHidden: "onHidden"
      },
      exportAs: ["popover"],
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]]
    });
  }
}

/***/ }),

/***/ 4588:
/*!**************************************************************!*\
  !*** ./projects/ngx-smart-popover/src/lib/popover.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopoverModule: () => (/* binding */ PopoverModule)
/* harmony export */ });
/* harmony import */ var _popover_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popover.directive */ 5899);
/* harmony import */ var _popover_content_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popover-content.component */ 7913);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);




class PopoverModule {
  static {
    this.ɵfac = function PopoverModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || PopoverModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
      type: PopoverModule
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](PopoverModule, {
    declarations: [_popover_directive__WEBPACK_IMPORTED_MODULE_0__.PopoverDirective, _popover_content_component__WEBPACK_IMPORTED_MODULE_1__.PopoverContentComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule],
    exports: [_popover_content_component__WEBPACK_IMPORTED_MODULE_1__.PopoverContentComponent, _popover_directive__WEBPACK_IMPORTED_MODULE_0__.PopoverDirective]
  });
})();

/***/ }),

/***/ 4473:
/*!*****************************************************************!*\
  !*** ./projects/ngx-smart-popover/src/lib/popover.placement.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PopoverPlacement: () => (/* binding */ PopoverPlacement)
/* harmony export */ });
class PopoverPlacement {
  static {
    this.Bottom = 'bottom';
  }
  static {
    this.BottomLeft = 'bottom-left';
  }
  static {
    this.BottomRight = 'bottom-right';
  }
  static {
    this.Left = 'left';
  }
  static {
    this.Right = 'right';
  }
  static {
    this.Top = 'top';
  }
  static {
    this.TopLeft = 'top-left';
  }
  static {
    this.TopRight = 'top-right';
  }
}

/***/ }),

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _projects_ngx_smart_popover_src_lib_popover_content_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../projects/ngx-smart-popover/src/lib/popover-content.component */ 7913);
/* harmony import */ var _projects_ngx_smart_popover_src_lib_popover_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../projects/ngx-smart-popover/src/lib/popover.directive */ 5899);



class AppComponent {
  constructor() {
    this.title = 'ngx-smart-popover-demo';
  }
  static {
    this.ɵfac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      decls: 105,
      vars: 17,
      consts: [["tearsRef", ""], ["eyebrowRef", ""], ["droolRef", ""], ["kissRef", ""], ["persevereRef", ""], ["sunglassesRef", ""], ["zanyRef", ""], ["thinkingRef", ""], ["tongueRef", ""], ["sweatRef", ""], ["cryRef", ""], [1, "jumbotron", "text-center"], ["height", "70", "src", "assets/popover.png"], [1, "text-center"], [1, "all-placements", "center-content"], ["height", "75", "src", "assets/tears.png", 1, "emoji-top", 3, "popover"], ["height", "75", "popoverPlacement", "top-right", "src", "assets/eyebrow.png", 1, "emoji-top-right", 3, "popover"], ["height", "75", "popoverPlacement", "right", "src", "assets/drool.png", 1, "emoji-right", 3, "popover"], ["height", "75", "popoverPlacement", "bottom-right", "src", "assets/kiss.png", 1, "emoji-bottom-right", 3, "popover"], ["height", "75", "popoverPlacement", "bottom", "src", "assets/persevere.png", 1, "emoji-bottom", 3, "popover"], ["href", "https://emojipedia.org/nerd-face/", "target", "_blank"], ["height", "75", "popoverPlacement", "bottom-left", "src", "assets/sunglasses.png", 1, "emoji-bottom-left", 3, "popover"], ["height", "75", "popoverPlacement", "left", "src", "assets/zany.png", 1, "emoji-left", 3, "popover"], ["height", "75", "popoverPlacement", "top-left", "src", "assets/thinking.png", 1, "emoji-top-left", 3, "popover"], [1, "click-to-show", "center-content"], ["height", "75", "src", "assets/tongue.png", 1, "emoji", 3, "popover", "popoverOnHover"], [1, "close-on-click-outside", "center-content"], [3, "closeOnClickOutside"], ["height", "75", "src", "assets/sweat.png", 1, "emoji", 3, "popover", "popoverOnHover"], [1, "placement-reflection", "center-content"], ["href", "https://emojipedia.org/face-with-tears-of-joy/", "target", "_blank"], ["height", "75", "popoverPlacement", "bottom", "src", "assets/cry.png", 1, "emoji", 3, "popover"], [1, "center-content", "body-popover"], ["height", "75", "src", "assets/tongue.png", 1, "emoji", 3, "popoverOnHover", "popover", "appendToBody"], [2, "height", "500px"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 11)(1, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "ngx-smart-popover Demo ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "h3", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Hover the emojis!");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 14)(7, "popover-content", null, 0)(9, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Face With Tears of Joy");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, " A yellow face with a big grin, uplifted eyebrows, and smiling eyes, each shedding a tear from laughing so hard. Widely used to show something is funny or pleasing. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "img", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "popover-content", null, 1)(15, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Face With Raised Eyebrow");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, " A face with a neutral mouth and single eyebrow raised. May be used to denote scepticism, disbelief, or disapproval. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "img", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "popover-content", null, 2)(21, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Drooling Face");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, " A face shown with drool dripping from one side of the mouth. May be used as a display of desire in a person, object or concept. Previously displayed with a startled appearance on Samsung devices. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](24, "img", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "popover-content", null, 3)(27, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, "Face Blowing a Kiss");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29, " An emoji face blowing a kiss, usually shown with one eye open and the other eye winking. A heart is shown leaving the kissing mouth. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](30, "img", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "popover-content", null, 4)(33, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, "Persevering Face");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, " Face with scrunched up and closed eyes, frowning. Used to show helplessness in a situation. May be on the verge of tears. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](36, "img", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "popover-content", null, 5)(39, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](40, "Smiling Face With Sunglasses");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](41, " A face smiling and wearing dark sunglasses that is used to denote a sense of cool. The ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "a", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](43, "nerd face emoji");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44, " is a similar face, but with regular glasses. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](45, "img", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "popover-content", null, 6)(48, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](49, "Zany Face");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](50, " A smiley making a silly face. A yellow face with a big grin and wide, white eyes, one larger than the other and in a wild, cockeyed expression. Many platforms, including Apple, depict its tongue stuck out and head tilted; others feature a full-toothed grin, giving it a more unhinged appearance. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](51, "img", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](52, "popover-content", null, 7)(54, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](55, "Thinking Face");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](56, " A face shown with a single finger and thumb resting on the chin, glancing upward. Used to indicate thinking, or deep thought. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](57, "img", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](58, "br")(59, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](60, "h3", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](61, "Click the emoji!");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](62, "div", 24)(63, "popover-content", null, 8)(65, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](66, "Winking Face With Tongue");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](67, " A face showing a stuck-out tongue, winking at the same time. Used in an attempt to be wacky, zany, or otherwise joking. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](68, "img", 25);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](69, "br")(70, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](71, "h3", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](72, "Close popover by the outside click");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](73, "div", 26)(74, "popover-content", 27, 9)(76, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](77, "Grinning Face With Sweat");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](78, " A face with a grin and smiling eyes similar to 'Grinning Face' but with a single bead of forehead sweat over its left eye (right on WhatsApp). Intended to depict nerves or discomfort but commonly used as a means of expressing \"whew!\" or \"close call!\" that would be implied when a person wipes sweat from their brow in an exaggerated manner. ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](79, "img", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](80, "br")(81, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](82, "h3", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](83, "This popover is set to open on the bottom.");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](84, "p", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](85, "if you scroll the emoji to the bottom of the viewport, it will auto reflect to the top.");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](86, "p", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](87, "scroll the page down to see it open on the bottom.");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](88, "div", 29)(89, "popover-content", null, 10)(91, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](92, "Loudly Crying Face");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](93, " A sad face with tears streaming down both cheeks. This face is distraught and inconsolable. Not to be confused with the ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](94, "a", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](95, "tears of joy emoji");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](96, ". ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](97, "img", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](98, "br")(99, "br");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](100, "h3", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](101, "Show in the body!");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](102, "div", 32);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](103, "img", 33);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](104, "div", 34);
        }
        if (rf & 2) {
          const tearsRef_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](8);
          const eyebrowRef_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](14);
          const droolRef_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](20);
          const kissRef_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](26);
          const persevereRef_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](32);
          const sunglassesRef_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](38);
          const zanyRef_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](47);
          const thinkingRef_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](53);
          const tongueRef_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](64);
          const sweatRef_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](75);
          const cryRef_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](90);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("popover", tearsRef_r1);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("popover", eyebrowRef_r2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("popover", droolRef_r3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("popover", kissRef_r4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("popover", persevereRef_r5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("popover", sunglassesRef_r6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("popover", zanyRef_r7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("popover", thinkingRef_r8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("popover", tongueRef_r9)("popoverOnHover", false);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("closeOnClickOutside", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("popover", sweatRef_r10)("popoverOnHover", false);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](18);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("popover", cryRef_r11);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("popoverOnHover", false)("popover", "Message from body")("appendToBody", true);
        }
      },
      dependencies: [_projects_ngx_smart_popover_src_lib_popover_content_component__WEBPACK_IMPORTED_MODULE_0__.PopoverContentComponent, _projects_ngx_smart_popover_src_lib_popover_directive__WEBPACK_IMPORTED_MODULE_1__.PopoverDirective],
      styles: [".jumbotron[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  vertical-align: bottom;\n  margin-right: 10px;\n}\n\n.center-content[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 800px;\n  margin: auto;\n  padding: 0 15px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n}\n\n.center-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  margin: 30px;\n  cursor: pointer;\n}\n\np[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osZUFBZTtFQUNmLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxTQUFTO0FBQ1giLCJzb3VyY2VzQ29udGVudCI6WyIuanVtYm90cm9uIGltZyB7XHJcbiAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcclxuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuXHJcbi5jZW50ZXItY29udGVudCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWF4LXdpZHRoOiA4MDBweDtcclxuICBtYXJnaW46IGF1dG87XHJcbiAgcGFkZGluZzogMCAxNXB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxufVxyXG5cclxuLmNlbnRlci1jb250ZW50IGltZyB7XHJcbiAgbWFyZ2luOiAzMHB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxucCB7XHJcbiAgbWFyZ2luOiAwO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
      changeDetection: 0
    });
  }
}

/***/ }),

/***/ 635:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 92);
/* harmony import */ var _projects_ngx_smart_popover_src_lib_popover_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../projects/ngx-smart-popover/src/lib/popover.module */ 4588);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);




class AppModule {
  static {
    this.ɵfac = function AppModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || AppModule)();
    };
  }
  static {
    this.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
      type: AppModule,
      bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent]
    });
  }
  static {
    this.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
      imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.BrowserModule, _projects_ngx_smart_popover_src_lib_popover_module__WEBPACK_IMPORTED_MODULE_1__.PopoverModule]
    });
  }
}
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
    imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.BrowserModule, _projects_ngx_smart_popover_src_lib_popover_module__WEBPACK_IMPORTED_MODULE_1__.PopoverModule]
  });
})();

/***/ }),

/***/ 5312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
  production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 635);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 5312);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map