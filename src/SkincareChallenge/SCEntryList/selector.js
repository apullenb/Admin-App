const getComponentData = (state) => {
  const { skincarePermissions ,entries ,permissionFeched} = state.entries;
  const glowPermissions = skincarePermissions?.find(
    (skincarePermission) => skincarePermission.areaId === 3
  );
  const view =
    glowPermissions?.levelId === 2 ||
    glowPermissions?.levelId === 3 ||
    glowPermissions?.levelId === 4;
  const edit = glowPermissions?.levelId === 3 || glowPermissions?.levelId === 4;

  return {
    entries,
    view,
    edit,
    permissionFeched,
  };
};

export default getComponentData;
