'use client';
import Link from 'next/link';
import { useEffect } from 'react';

const Header = () => {
  useEffect(() => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!?#£$*-_+';

    document.querySelector('h1').onmouseover = (e) => {
      let iteration = 0;
      let indexPosition = 0;

      const interval = setInterval(() => {
        indexPosition = e.target.dataset.value.length;
        e.target.innerText = e.target.innerText
          .split('')
          .map((letter, index) => {
            if (iteration >= e.target.dataset.value.length) {
              clearInterval(interval);
            }
            if (index - 5 < iteration) {
              indexPosition += ~~(indexPosition - index) / 10;
              return e.target.dataset.value[index];
            }

            return letters[~~(Math.random() * 35)];
          })
          .join('');

        iteration += indexPosition / 100;
      }, 20);
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link href="/">
            <h1 data-value=">>/: HOLOGRAPHICS-ON">
              &gt;&gt;/: HOLOGRAPHICS-ON
            </h1>
          </Link>
        </div>
        {/* <div className="links">
          <Link href="/about"> About</Link>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
