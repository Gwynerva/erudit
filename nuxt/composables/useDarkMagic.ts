declare let Ya;

const getElementId = (bannerId: string) =>
{
    return `DarkMagic_${bannerId}`;
}

const registerBanner = (bannerId: string) =>
{
    const { binaryTheme } = useTheme();

    (window['yaContextCb'] ||= []).push(() => {
        Ya.Context.AdvManager.render({
            renderTo: getElementId(bannerId),
            blockId: bannerId,
            darkTheme: binaryTheme.value === 'dark',
        });
    });
}

export default function()
{
    return {
        getElementId,
        registerBanner,
    }
}