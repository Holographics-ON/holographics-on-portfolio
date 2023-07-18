import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="navbar">
      {/* <h1>Welcome Homepage</h1> */}
      <ul className="init-dir">
        <li>
          <Link href="/"> Home </Link>
        </li>
        <li>
          <Link href="/about"> About</Link>
        </li>
        <li>
          <Link href="/threejs-test"> 3D init setup</Link>
        </li>
        <li>
          <Link href="/threejs-test/gltf-demo"> gltf demo</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
