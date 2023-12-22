export const MeanMethod = (props) => {
  //console.log("method mean", props);
  var total = 0;
  for (let i = 0; i < props.length; i += 1) {
    total = total + props[i];
  }
  const result = total / props.length;
  return result;
};

export const MedianMethod = (props) => {
  const length = props.length;
  props.sort((a, b) => a - b);
  if (length % 2 === 0) {
    return (props[length / 2 - 1] + props[length / 2]) / 2;
  }
  return props[(length - 1) / 2];
};
export const ModeMethod = (props) => {
  var modes = [],
    count = [],
    i,
    num,
    maxIndex = 0;
  for (i = 0; i < props.length; i += 1) {
    num = props[i];
    count[num] = (count[num] || 0) + 1;
    if (count[num] > maxIndex) {
      maxIndex = count[num];
    }

    for (let j in count)
      if (count.hasOwnProperty(j)) {
        if (count[j] === maxIndex) {
          modes.push(Number(j));
        }

        return modes[0];
      }
  }
};
export const dataSeparate = (data) => {
  var dataset = [];
  const classType = data.reduce((filtered, el) => {
    if (!filtered.includes(el["Alcohol"])) {
      filtered.push(el.Alcohol);
    }
    return filtered;
  }, []);

  classType.forEach((series) => {
    dataset.push({
      seriesname: series,
      value: data.reduce((filtered, el) => {
        if (el["Alcohol"] === series) {
          filtered.push({ value: el });
        }
        return filtered;
      }, []),
    });
  });
  return dataset;
};
export const dataPivot = (arr) => {
  var pivotDataFa = [];
  var pivotDataGa = [];
  var classtype = ["Measure"];
  var meanFa = ["Flavanoids Mean"];
  var meanGa = ["Gamma Mean"];
  var medianFa = ["Flavanoids Median"];
  var medianGa = ["Gamma Median"];
  var modeFa = ["Flavanoids Mode"];
  var modeGa = ["Gamma Mode"];
  // eslint-disable-next-line array-callback-return
  arr.map((item) => {
    classtype.push("Class " + item.classType);
    meanFa.push(item.meanFa);
    meanGa.push(item.meanGa);
    medianFa.push(item.medianFa);
    medianGa.push(item.medianGa);
    modeFa.push(item.modeFa);
    modeGa.push(item.modeGa);
  });
  pivotDataFa = [[...classtype], [...meanFa], [...medianFa], [...modeFa]];
  pivotDataGa = [[...classtype], [...meanGa], [...medianGa], [...modeGa]];
  return { pivotDataFa, pivotDataGa };
};
