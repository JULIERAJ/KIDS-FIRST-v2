import PropTypes from 'prop-types';
const KFToolbar = ({ onView, label, views, onNavigate }) => {
  return (
    <div className="KF-toolbar">
      <em> ~ Custom toolbar ~ </em>

      <div className="toolbar">
        <div className="rbc-btn-group">
          <button type="button" onClick={() => onNavigate('PREV')}>
                back
          </button>
          <button type="button" onClick={() => onNavigate('NEXT')}>
                next
          </button>
        </div>

        <div className="rbc-toolbar-label">{label}</div>

        <div className="rbc-btn-group">
          {views.map((view) => (
            <button key={view} type="button" onClick={() => onView(view)}>
              {view}
            </button>
          ))}
          <button className="create">Create</button>
        </div>
      </div>

      <div className="round-btn">
        <span>
          <button>J</button> James +
        </span>
        <span>
          <button>S</button> Sarah +
        </span>
        <span>
          <button>V</button>Viki +
        </span>
      </div>
    </div>
  );
};

// Prop types validation
KFToolbar.propTypes = {
  onView: PropTypes.func,
  label: PropTypes.string,
  views: PropTypes.array,
  onNavigate: PropTypes.func
};

export default KFToolbar;
