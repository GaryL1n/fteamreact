import '../style/LessonSelectPrice.scss';

function LessonSelectPrice(props) {
  const { danceListOption, danceList, setDanceList } = props;

  return (
    <div className="w-33 ">
      <select
        className="h-100 cooler_select"
        value={danceList}
        // 換選項的動作
        onChange={(e) => {
          setDanceList(e.target.value);
        }}
      >
        <option className="cooler_select" value="">
          DANCE
        </option>
        {danceListOption.map((v, i) => {
          return (
            <option className="cooler_select" key={i} value={v}>
              {v}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default LessonSelectPrice;
