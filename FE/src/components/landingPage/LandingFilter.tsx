import CustomSelect from "@/components/common/select";
import { useAppDispatch, useAppSelector } from "@/helper/hooks";
import { setSelectedCountry } from "@/reducers/filters/filterSlice";
import {
  fetchSetting,
  setSelectedCountry as setSelectedCountryHome,
  setSelectedCurrency,
  setSelectedLanguage,
} from "@/reducers/userSettings/settings";
import { useEffect } from "react";

export default function LandingFilter() {
  const dispatch = useAppDispatch();
  const { allSettings, selectedSettings, isLoading } = useAppSelector(
    (store) => store.settings
  );

  // console.log(selectedSettings.Country.Abbreviation);

  useEffect(() => {
    if (allSettings.Country.length === 0) {
      dispatch(fetchSetting());
    }
  }, [allSettings.Country.length, dispatch]);

  function handleCountryChange(val: any) {
    const selected = allSettings.Country.find((x) => x.CountryName === val);
    dispatch(setSelectedCountryHome(selected));
    dispatch(setSelectedCountry([selected]));
  }

  function handleCurrencyChange(val: string) {
    const selected = allSettings.Currency.find((x) => x.value === val);
    console.log("selected", selected);
    dispatch(setSelectedCurrency(selected));
  }

  function handleLanguageChange(val: string) {
    const selected = allSettings.Language.find((x) => x.value === val);
    console.log("selected", selected);
    dispatch(setSelectedLanguage(selected));
  }

  const Countries = allSettings.Country.map((x) => x.CountryName);

  return (
    <>
      {!isLoading && (
        <div className="filters-dropdown">
          <CustomSelect
            label="Country"
            items={Countries}
            value={selectedSettings.Country.CountryName}
            handleChange={handleCountryChange}
          />
          <CustomSelect
            label="Language"
            items={allSettings.Language}
            value={selectedSettings.Language}
            handleChange={handleLanguageChange}
          />
          <CustomSelect
            label="Currency"
            items={allSettings.Currency}
            value={selectedSettings.Currency}
            handleChange={handleCurrencyChange}
          />
        </div>
      )}
    </>
  );
}
