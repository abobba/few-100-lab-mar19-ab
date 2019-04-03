export function ready(cb: any) {
      document.onreadystatechange = function () {
        if (document.readyState == "interactive") {
          // Initialize your application or run some code.
          cb();
        }
      };
    } 