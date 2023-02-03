import { omit } from "lodash";
import data from "./data";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import ReturnTableHeaderKeys from "./utils/ReturnTableHeaderKeys";

// ovo je pojednostavljena verzija projekta, jedina funkcionalnost je prikazivanje podataka
// ako mozda ima nesto neobicno to je najvjerojatnije preostalo od neke funkcionalnosti za sortiranje, filtriranje i sl.

// u datoteci struktura kopomenata.png je crtež kako su strukturirane komponente

// ako zelite prikazivati podatke ako je poslan template prop zamjenite "data" sa "dataTemplate"
// ako zelite prikazivati moguce podatke sa vecim dephtom zamjenite "data" sa "possibleData"
// htio bih napraviti rekurzivnu funkciju koja ce prikazivati podatke cak i ako se korisit possibleData

// razlog zasto se koristi "Object.Entries" i vecinom ne definirana imena je zato sto
// koristim componentu na razlicitim mjestima sa razlicitim lista objekata
// npr. za prikazivanje članova tvrtke itd.
// isto tako "data" property u objektu je nepoznatog oblika
// u tablici ce biti tipa JSONB, tu ce biti spremljeni podaci iz forme koju je neki drugi korisnik kreirao
let tableItems = data;

function App() {
  // u projektu imam više tipova tablica
  // taj tip se inace posalje kao prop pa bazirano na koji je tip tablice neki podaci se nesmiju pokazivati
  // kao npr formFiller ali u ovom primjeru nam to ne treba
  let unallowedFields = [""];

  // tip tablice koji se inace posalje kao prop
  const tableType = "report";

  // isto tako se posalje i template kao prop
  // ako template postoji podaci se trebaju drugacije ispisivati
  // ako template postoji "data" property se treba flattenati radi pravilnog ispisa
  // kada je template prop poslan znaci da ce data property od svih objekata imati iste propertje tako da nece bit bugova
  const template = null;

  // funkcija koja uzima podatke i ako postoji template izbaci nedozvoljena polja i flattena data object
  // ako nepostoji podatci zamo izbaci nedovoljena polja

  // tableActions se isto pošalju kao prop i ako postoje stvori se stupac gdje se mogu ispisivati
  const tableActions = null;
  const user = null;

  let unallowedInfo = ["password", "id"];

  // dodavanje nedozvoljenih polja bazirano na propovima
  if (user && tableItems[0].formfiller) {
    unallowedFields.push("formfiller");
  }

  if (template && tableItems[0].template) {
    unallowedFields.push("template", "data");
  }

  // postavljanje podataka koji ce se prikazati u tablici
  tableItems = template
    ? tableItems.map((item) => {
        let newItem = { ...omit(item, unallowedFields) };
        if (item.data && typeof item.data === "object") {
          Object.entries(item.data)
            .slice(0, 4)
            .forEach(([key, value]) => {
              if (typeof value === "object") {
                newItem[key] = { ...value };
              } else {
                newItem[key] = value;
              }
            });
        }
        return newItem;
      })
    : tableItems.map((item) => {
        if (item.data && typeof item.data === "object") {
          return {
            ...omit(item, unallowedFields),
            data: Object.values(item.data),
          };
        } else {
          return omit(item, unallowedFields);
        }
      });

  // postavljanje podataka koji ce se pokazati u zaglavlju tablice
  // (ovo isSortable je dodano jer u pravoj verziji ima sortiranje asc i desc no za ovaj primjer sam to maknuo)
  let tableHeadItems = template
    ? ReturnTableHeaderKeys(tableItems[0]).filter(
        (item) => !unallowedFields.includes(item.name)
      )
    : ReturnTableHeaderKeys(tableItems[0]).filter(
        (item) => !unallowedFields.includes(item.name)
      );

  tableType === "report" || tableType === "object" ? (
    tableHeadItems.unshift({ name: "Select", isSortable: false })
  ) : (
    <></>
  );
  tableActions && tableHeadItems.push({ name: "Actions", isSortable: false });

  return (
    <div>
      <table className="w-full">
        <TableHead items={tableHeadItems} />
        <TableBody
          items={tableItems}
          unallowedInfo={unallowedInfo}
          tableType={tableType}
        />
      </table>
    </div>
  );
}

export default App;
