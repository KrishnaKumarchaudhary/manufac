/* eslint-disable no-const-assign */
import "./App.css";
import { useEffect, useState } from "react";
import data from "./Wine-Data.json";
import {
  MeanMethod,
  MedianMethod,
  ModeMethod,
  dataSeparate,
  dataPivot,
} from "./Utility/Methodes";
function App() {
  const [finalReultFa, setFinalResultFa] = useState([]);
  const [finalReultGa, setFinalResultGa] = useState([]);

 
  useEffect(() => {
    const dataset = dataSeparate(data);
    const fladata = dataset.map((item) => {
      const Flavanoids = [];
      const Gamma = [];
      item.value.map((Fla) => {
        return (
          Flavanoids.push(Number(Fla.value.Flavanoids)),
          Gamma.push((Fla.value.Ash * Fla.value.Hue) / Fla.value.Magnesium)
        );
      });
      //console.log("call parameter", Flavanoids, item.value.Alcohol);
      const meanValueFa = MeanMethod(Flavanoids);
      const medianValueFa = MedianMethod(Flavanoids);
      const modeValueFa = ModeMethod(Flavanoids);
      const meanValueGa = MeanMethod(Gamma);
      const medianValueGa = MedianMethod(Gamma);
      const modeValueGa = ModeMethod(Gamma);
      return {
        classType: item.seriesname,
        meanFa: meanValueFa.toFixed(3),
        medianFa: medianValueFa.toFixed(3),
        modeFa: modeValueFa.toFixed(3),
        meanGa: meanValueGa.toFixed(3),
        medianGa: medianValueGa.toFixed(3),
        modeGa: modeValueGa.toFixed(3),
      };
    });
    const { pivotDataFa, pivotDataGa } = dataPivot(fladata);
    setFinalResultFa(pivotDataFa);
    setFinalResultGa(pivotDataGa);
  }, []);
  console.log(finalReultFa);
   console.log(finalReultGa);
  return (
    <div className="App">
      <table >
        <tbody>
          {finalReultFa.map((item) => {
            return (
              <tr>
                {item.map((i) => {
                  return <td>{i}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <table>
        <tbody>
          {finalReultGa.map((item) => {
            return (
              <tr>
                {item.map((i) => {
                  return <td>{i}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
