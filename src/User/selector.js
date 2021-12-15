const getComponentData = (state) => {
  const { skincarePermissions,accounts,permissionFeched ,error} = state.entries;
  
  const glowPermissions = skincarePermissions?.find(
    (skincarePermission) => skincarePermission.areaId === 1
  );
  const view =
    glowPermissions?.levelId === 2 ||
    glowPermissions?.levelId === 3 ||
    glowPermissions?.levelId === 4;
  const edit = glowPermissions?.levelId === 3 || glowPermissions?.levelId === 4;

  return {
    view,
    edit,
    accounts,
    permissionFeched,
    error
  };
};

export default getComponentData;
