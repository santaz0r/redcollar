import rclogo from '../../../assets/rclogo.svg';
const Header = () => {
  return (
    <div>
      <div>
        <div>
          <img src={rclogo} alt="red collar logo" />
        </div>
        <div>red collar</div>
        <div>
          planner <span>event</span>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Header;
