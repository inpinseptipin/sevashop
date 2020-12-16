import { useRadioGroup } from "@chakra-ui/react";

export const archives = () => {
  const {
    getRootProps,
    getRadioProps: getGenderRadioProps,
    name,
  } = useRadioGroup({
    name: "gender",
    onChange: console.log,
  });

  // console.log("root props is", getGenderRadioProps, "name is", name);
  const {
    getRootProps: _,
    getRadioProps: getCategoryRadioProps,
  } = useRadioGroup({
    name: "category",
    onChange: console.log,
  });
  const { getRootProps: __, getRadioProps: getStaffRadioProps } = useRadioGroup(
    {
      name: "staff",
      onChange: console.log,
    }
  );
  const { getRootProps: ___, getRadioProps: getTimeRadioProps } = useRadioGroup(
    {
      name: "duration",
      onChange: console.log,
    }
  );
  {
    /* <HStack>
              {genderOptions.map((value) => {
                const radio = getGenderRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </HStack> */
  }
};
