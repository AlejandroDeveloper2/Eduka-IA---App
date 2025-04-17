import { i18n } from "@/lib/store/lang-store/Lang.store";

/**
 * Ejecuta tareas asíncronas de forma concurrente con un límite de simultaneidad.
 *
 * @template T Tipo del ítem a procesar.
 * @param {T[]} items - Lista de elementos a procesar.
 * @param {(item: T) => Promise<void>} task - Función async que se ejecuta sobre cada item.
 * @param {number} [concurrencyLimit=5] - Número máximo de tareas simultáneas.
 *
 * @returns {Promise<void>} Una promesa que se resuelve cuando todas las tareas se han completado.
 *
 * @example
 * await downloadConcurrently(resources, async (r) => await download(r), 3);
 */

export const downloadConcurrently = async <T>(
  items: T[],
  task: (item: T) => Promise<void>,
  concurrencyLimit: number = 10
): Promise<void> => {
  const queue = [...items];
  const errors: unknown[] = [];

  const workers = Array.from({ length: concurrencyLimit }).map(async () => {
    while (queue.length > 0) {
      const item = queue.shift();

      if (!item) break;

      try {
        await task(item);
      } catch (err) {
        console.warn(
          i18n.t("operations-messages.download-concurrently-warn-msg") + ":",
          err
        );
        errors.push(err);
      }
    }
  });

  await Promise.all(workers);

  if (errors.length > 0) {
    console.warn(
      `${i18n.t("operations-messages.download-concurrently-error-msg")}: (${
        errors.length
      })`
    );
  }
};
