const getComponentData = (state) => {
  const { skincarePermissions ,permissionFeched , PermissionsError} = state.entries;
  const { countries } = state.countries;
  const glowPermissions = skincarePermissions?.find(
    (skincarePermission) => skincarePermission.areaId === 6
  );
  const view =
    glowPermissions?.levelId === 2 ||
    glowPermissions?.levelId === 3 ||
    glowPermissions?.levelId === 4;
  const edit = glowPermissions?.levelId === 31 || glowPermissions?.levelId === 41;

  return {
    view,
    edit,
    countries,
    permissionFeched,
    PermissionsError,
  };
};

export default getComponentData;
